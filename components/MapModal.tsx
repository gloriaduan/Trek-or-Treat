import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MapModal;
