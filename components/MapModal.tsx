"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocationStore, useStartStore } from "@/store/app-store";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
          <div className="embla p-5" ref={emblaRef}>
            <div className="embla__container">
              {isOpen &&
                currLocation.images.map((image, index) => (
                  <div key={index} className="embla__slide">
                    <Image
                      alt="image"
                      width={"auto"}
                      height={"auto"}
                      sizes="100vw"
                      src={`${image}`}
                    />
                  </div>
                ))}
            </div>
            <button className="embla__prev" onClick={scrollPrev}>
              Prev
            </button>
            <button className="embla__next" onClick={scrollNext}>
              Next
            </button>
          </div>
          <button className="btn-primary" onClick={handleAddDestination}>
            Add Destination
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MapModal;
