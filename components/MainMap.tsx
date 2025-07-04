"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import React, { useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import MapModal from "./MapModal";
import { API_KEY } from "@/lib/config";
import {
  useGeoJsonStore,
  useLayerStore,
  useStartStore,
  useViewStore,
} from "@/store/app-store";

interface CustomLocation {
  id: string;
  address: string;
  longitude: number;
  avgRating: number;
  latitude: number;
  description: string;
  images: string[];
  createdAt: Date;
}

interface MainMapProps {
  locations?: CustomLocation[];
}

const MainMap = ({ locations = [] }: MainMapProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currLocation, setCurrLocation] = useState({} as CustomLocation);
  const layer = useLayerStore((state) => state.layer);
  const geojson = useGeoJsonStore((state) => state.geojson);
  const start = useStartStore((state) => state.start);
  const mapView = useViewStore((state) => state.mapView);
  const setViewState = useViewStore((state) => state.setView);

  const handleMarkerClick = (location: CustomLocation) => {
    setCurrLocation(location);
    setIsOpen(true);
  };

  return (
    <>
      <Map
        mapboxAccessToken={API_KEY}
        initialViewState={{
          longitude: -79.50852043645438,
          latitude: 43.62057394024622,
          zoom: 10,
        }}
        {...mapView}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            color="orange"
            anchor="bottom"
            onClick={() => {
              handleMarkerClick(location);
            }}
          >
            <Image
              src="/map-pin.png"
              width={50}
              height={70}
              alt={location.address}
            />
          </Marker>
        ))}
        {start && (
          <Marker
            key={start.id}
            longitude={start.longitude || 0}
            latitude={start.latitude || 0}
            color="orange"
            anchor="bottom"
          >
            <Image
              src="/start-pin.png"
              width={20}
              height={20}
              alt={start.address || "Start address"}
            />
          </Marker>
        )}
        {layer &&
          geojson &&
          Object.keys(geojson).length > 0 &&
          Object.keys(layer).length > 0 && (
            <Source type="geojson" data={geojson}>
              <Layer {...layer} />
            </Source>
          )}
      </Map>
      <MapModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currLocation={currLocation as CustomLocation}
      />
    </>
  );
};

export default MainMap;
