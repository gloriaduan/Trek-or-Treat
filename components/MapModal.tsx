import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocationStore } from "@/store/app-store";

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
  const addDestination = useLocationStore((state) => state.addDestination);

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
          <button
            className="btn-primary"
            onClick={() => {
              addDestination({
                id: currLocation.id,
                address: currLocation.address,
                longitude: currLocation.longitude,
                latitude: currLocation.latitude,
              });
            }}
          >
            Add Destination
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MapModal;
