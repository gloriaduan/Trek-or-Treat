"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  onChange?: (rating: number) => void;
  initialRating?: number;
}

export function StarRating({ onChange, initialRating = 0 }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRating = (currentRating: number) => {
    if (currentRating === rating) {
      // Deselect the star if it's already selected
      setRating(0);
      if (onChange) {
        onChange(0);
      }
    } else {
      setRating(currentRating);
      if (onChange) {
        onChange(currentRating);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={cn(
            "p-0 hover:bg-transparent focus:outline-none",
            star <= (hover || rating) ? "text-primary" : "text-gray-300"
          )}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
          aria-label={`Rate ${star} stars out of 5`}
        >
          <Star
            className="h-4 w-4 sm:h-6 sm:w-6 fill-current"
            strokeWidth={1.5}
          />
        </button>
      ))}
      <span className="ml-2 text-md text-gray-600">
        {rating > 0 ? `${rating} out of 5 stars` : "No rating"}
      </span>
    </div>
  );
}
