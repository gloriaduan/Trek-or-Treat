"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { submitRating } from "@/lib/locations";

interface StarRatingProps {
  onChange?: (rating: number) => void;
  initialRating?: number;
  locationId: string;
}

export function StarRating({
  onChange,
  initialRating = 0,
  locationId,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [submitMessage, setSubmitMessage] = useState("");

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

  const handleSubmitRating = async () => {
    setSubmitMessage("Submitting rating...");
    try {
      const response = await submitRating({
        rating: rating,
        locationId: locationId,
      });

      if (response.status === "SUCCESS") {
        setSubmitMessage("Rating submitted successfully.");
      }
    } catch (error) {
      console.log(`Error occurred: ${error}`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <div>
          <p className="text-center mb-2 text-xs text-muted-foreground">
            Leave a rating
          </p>
          <div className="flex justify-center items-center space-x-2">
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
            <span className="ml-2 text-sm text-muted-foreground">
              {rating > 0 ? `${rating} out of 5 stars` : "No rating"}
            </span>
          </div>
        </div>
        <Button
          className="bg-muted text-gray-500 hover:bg-black hover:text-white"
          disabled={rating > 0 ? false : true}
          onClick={handleSubmitRating}
        >
          Submit Rating
        </Button>
        <p className="text-xs text-muted-foreground">{submitMessage}</p>
      </div>
    </>
  );
}
