"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";

interface Location {
  id: string;
  address: string;
  longitude: number;
  latitude: number;
  description: string;
  images: string[];
  createdAt: Date;
}

interface MainMapProps {
  locations?: Location[];
}

const MainMap = ({ locations = [] }: MainMapProps) => {
  return (
    <>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiOWxvcmlhIiwiYSI6ImNtNDk0Z3lsODA2aWoybXE0eTMxc2Z4cDkifQ.mXmfJI17bHF8aXJ7fqsevQ"
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
          >
            <Image
              src="/map-pin.png"
              width={50}
              height={70}
              alt={location.address}
            />
          </Marker>
        ))}
      </Map>
    </>
  );
};

export default MainMap;
