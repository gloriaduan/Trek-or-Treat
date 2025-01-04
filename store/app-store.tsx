import { create } from "zustand";

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

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  addDestination: (location) =>
    set((state) => ({ locations: [...state.locations, location] })),
  removeDestination: (id) =>
    set((state) => ({
      locations: state.locations.filter((location) => location.id !== id),
    })),
}));
