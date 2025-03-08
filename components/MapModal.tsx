"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocationStore, useStartStore } from "@/store/app-store";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { StarRating } from "./StarRating";

interface CustomLocation {
  id: string;
  address: string;
  avgRating: number;
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

  const [rating, setRating] = useState(0);

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
        <div className="embla pt-6 relative" ref={emblaRef}>
          <div className="embla__container">
            {isOpen &&
              currLocation.images.map((image, index) => (
                <div key={index} className="embla__slide relative h-60">
                  <Image
                    alt="image"
                    fill={true}
                    sizes="100vw"
                    src={`${image}`}
                    className="rounded-lg"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
          </div>
          <button
            className="embla__prev absolute left-0 top-2/4"
            onClick={scrollPrev}
          >
            <ChevronLeft color="white" />
          </button>
          <button
            className="embla__next absolute right-0 top-2/4"
            onClick={scrollNext}
          >
            <ChevronRight color="white" />
          </button>
        </div>
        <DialogHeader>
          <DialogTitle className="mb-2">{currLocation.address}</DialogTitle>
          <div className="flex items-center">
            <Star className="fill-current text-primary" />
            <p className="ml-2 text-primary">
              {currLocation.avgRating?.toFixed(1)}
            </p>
          </div>
        </DialogHeader>
        <DialogDescription className="mb-5">
          {currLocation.description}
        </DialogDescription>
        <div className="mb-5">
          <StarRating
            initialRating={rating}
            locationId={currLocation.id}
            onChange={(rating) => setRating(rating)}
          />
        </div>
        <DialogFooter className="sm:justify-stretch sm:flex-col">
          <button className="btn-primary" onClick={handleAddDestination}>
            Add Destination
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MapModal;
