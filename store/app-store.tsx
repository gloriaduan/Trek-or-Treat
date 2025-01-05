import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CustomLocation {
  id: string;
  address: string;
  longitude: number;
  latitude: number;
}

interface LocationStore {
  locations: CustomLocation[];
  addDestination: (location: CustomLocation) => void;
  removeDestination: (id: string) => void;
}

export const useLocationStore = create<LocationStore>()(
  devtools((set) => ({
    locations: [],
    addDestination: (location) =>
      set((state) => ({ locations: [...state.locations, location] })),
    removeDestination: (id) =>
      set((state) => ({
        locations: state.locations.filter((location) => location.id !== id),
      })),
  }))
);
