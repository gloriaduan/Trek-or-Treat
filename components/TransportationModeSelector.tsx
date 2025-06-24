"use client";

import { Car, Bike, FootprintsIcon as Walking } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocationStore } from "@/store/app-store";

type TransportMode = "driving" | "walking" | "cycling";

interface TransportationModeSelectorProps {
  onModeChange?: (mode: TransportMode) => void;
  routeSubmit?: (mode: string) => void;
  className?: string;
}

export default function TransportationModeSelector({
  onModeChange,
  routeSubmit,
  className,
}: TransportationModeSelectorProps) {
  const profile = useLocationStore((state) => state.profile);
  const selectProfile = useLocationStore((state) => state.setProfile);

  const handleModeChange = (mode: TransportMode) => {
    selectProfile(mode);
    onModeChange?.(mode);
    routeSubmit?.(mode);
  };

  return (
    <div
      className={cn(
        "flex w-full min-w-[280px] rounded-full border bg-background p-0.5 gap-1",
        className
      )}
    >
      <button
        onClick={() => handleModeChange("driving")}
        className={cn(
          "flex flex-1 items-center justify-center gap-1 text-black rounded-full py-1.5 transition-all text-xs",
          profile === "driving"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        )}
        aria-pressed={profile === "driving"}
      >
        <Car className="h-3 w-3" />
        <span className="font-medium">Driving</span>
      </button>

      <button
        onClick={() => handleModeChange("walking")}
        className={cn(
          "flex flex-1 items-center justify-center text-black gap-1 rounded-full py-1.5 transition-all text-xs",
          profile === "walking"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        )}
        aria-pressed={profile === "walking"}
      >
        <Walking className="h-3 w-3" />
        <span className="font-medium">Walking</span>
      </button>

      <button
        onClick={() => handleModeChange("cycling")}
        className={cn(
          "flex flex-1 items-center justify-center gap-1 text-black rounded-full py-1.5 transition-all text-xs",
          profile === "cycling"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        )}
        aria-pressed={profile === "cycling"}
      >
        <Bike className="h-3 w-3" />
        <span className="font-medium">Cycling</span>
      </button>
    </div>
  );
}
