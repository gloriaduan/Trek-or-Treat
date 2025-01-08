"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import MapModal from "./MapModal";
import { API_KEY } from "@/lib/config";
import { useGeoJsonStore, useLayerStore } from "@/store/app-store";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

interface CustomLocation {
  id: string;
  address: string;
  longitude: number;
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

  useEffect(() => {
    console.log(layer, geojson);
  }, []);

  const handleMarkerClick = (location: CustomLocation) => {
    // console.log(location.address);
    setCurrLocation(location);
    setIsOpen(true);
  };

  return (
    <>
      <Map
        mapboxAccessToken={API_KEY}
        initialViewState={{
          longitude: -79.62275045355916,
          latitude: 43.5870256842269,
          zoom: 13,
        }}
        style={{}}
        mapStyle="mapbox://styles/9loria/cm494mxig006i01qog6g3fufo"
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
