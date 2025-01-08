import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Feature } from "geojson";
import { LineLayerSpecification } from "mapbox-gl";

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

interface GeoJsonStore {
  geojson: Feature;
  addGeoJson: (object: Feature) => void;
}

interface LayerStore {
  layer: LineLayerSpecification;
  addLayer: (object: LineLayerSpecification) => void;
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

export const useGeoJsonStore = create<GeoJsonStore>()(
  devtools((set) => ({
    geojson: {},
    addGeoJson: (object) => set({ geojson: object }),
  }))
);

export const useLayerStore = create<LayerStore>()(
  devtools((set) => ({
    layer: {},
    addLayer: (object) => set({ layer: object }),
  }))
);
