import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Feature } from "geojson";
import { LineLayerSpecification } from "mapbox-gl";
import { MapRef } from "react-map-gl";

interface CustomLocation {
  id?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
}

interface LocationStore {
  locations: CustomLocation[];
  profile: string;
  clearDestinations: () => void;
  addDestination: (location: CustomLocation) => void;
  removeDestination: (id: string) => void;
  setProfile: (profile: string) => void;
}

interface StartStore {
  start: CustomLocation;
  addStart: (location: CustomLocation) => void;
  removeStart: () => void;
}

interface GeoJsonStore {
  geojson: Feature;
  addGeoJson: (object: Feature) => void;
}

interface LayerStore {
  layer: LineLayerSpecification;
  addLayer: (object: LineLayerSpecification) => void;
}

interface viewStore {
  mapView: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  setView: (coords: {
    longitude: number;
    latitude: number;
    zoom: number;
  }) => void; // Add setView
}

export const useViewStore = create<viewStore>()(
  devtools((set) => ({
    mapView: {
      longitude: -79.62275045355916,
      latitude: 43.5870256842269,
      zoom: 13,
    },
    setView: (coords: any) => {
      const { longitude, latitude, zoom } = coords;
      set({ mapView: { longitude, latitude, zoom } });
    },
  }))
);

export const useLocationStore = create<LocationStore>()(
  devtools((set) => ({
    locations: [],
    profile: "driving",
    clearDestinations: () => set({ locations: [] }),
    addDestination: (location) =>
      set((state) => ({ locations: [...state.locations, location] })),
    removeDestination: (id) =>
      set((state) => ({
        locations: state.locations.filter((location) => location.id !== id),
      })),
    setProfile: (profile: string) => set({ profile }),
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

export const useStartStore = create<StartStore>()(
  devtools((set) => ({
    start: {},
    addStart: (location) => set({ start: location }),
    removeStart: () => set({ start: {} }),
  }))
);
