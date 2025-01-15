import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocationStore, useStartStore } from "@/store/app-store";

interface CustomLocation {
  id: string;
  address: string;
  longitude: number;
  latitude: number;
  description: string;
  images: string[];
  createdAt: Date;
}

interface MapModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currLocation: CustomLocation;
}

function MapModal({ isOpen, setIsOpen, currLocation }: MapModalProps) {
  const start = useStartStore((state) => state.start);
  const addStart = useStartStore((state) => state.addStart);
  const addDestination = useLocationStore((state) => state.addDestination);

  const handleAddDestination = () => {
    const destination = {
      id: currLocation.id,
      address: currLocation.address,
      longitude: currLocation.longitude,
      latitude: currLocation.latitude,
    };

    if (Object.keys(start).length == 0) {
      addStart(destination);
    } else {
      addDestination(destination);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currLocation.address}</DialogTitle>
          <DialogDescription>{currLocation.description}</DialogDescription>
          <button className="btn-primary" onClick={handleAddDestination}>
            Add Destination
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MapModal;
