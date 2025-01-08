"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "./ui/label";
import { API_KEY } from "@/lib/config";
import { Input } from "./ui/input";
import {
  useGeoJsonStore,
  useLayerStore,
  useLocationStore,
} from "@/store/app-store";
import type { Feature } from "geojson";
import { LineLayerSpecification } from "mapbox-gl";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

function DirectionsBar() {
  const [value, setValue] = React.useState("");
  const addGeoJson = useGeoJsonStore((state) => state.addGeoJson);
  const addLayer = useLayerStore((state) => state.addLayer);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  const locations = useLocationStore((state) => state.locations);

  const handleAutofillRetrieve = async (res: any) => {
    console.log(res);
  };

  const routeSubmit = async () => {
    if (locations.length > 0) {
      let destinationStrs = "";
      locations.forEach((location) => {
        destinationStrs += `${location.longitude},${location.latitude};`;
      });
      // console.log(destinationStrs);
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${destinationStrs.substring(
          0,
          destinationStrs.length - 1
        )}?steps=true&geometries=geojson&access_token=${API_KEY}`,
        { method: "GET" }
      );
      const data = await res.json();
      const routeCoords = data.routes[0].geometry.coordinates;

      const geojson: Feature = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: routeCoords,
        },
      };

      addGeoJson(geojson);

      const routeLayer: LineLayerSpecification = {
        id: "route",
        type: "line",
        source: "geojson",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#eb6028",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      };

      addLayer(routeLayer);
      // console.log(routeCoords);
    } else {
      alert("Please enter a starting point and at least one destination");
    }
  };

  return (
    <aside className="directions-bar bg-black md:max-w-xs w-full md:h-full-height h-52 p-3 md:py-10 md:px-5">
      <ScrollArea className="h-full rounded-md p-3">
        <div className="grid w-full items-center gap-3">
          <AddressAutofill
            accessToken={`${API_KEY}`}
            onRetrieve={(res) => {
              console.log("onRetrieve called");
              handleAutofillRetrieve(res);
            }}
          >
            <Label htmlFor="address">Choose a starting point:</Label>
            <Input
              type="text"
              id="address"
              placeholder="Enter a place..."
              value={value}
              onChange={handleChange}
            />
          </AddressAutofill>
          {locations &&
            locations.map((location, i) => (
              <p className="text-white" key={i}>
                {location.address}
              </p>
            ))}
          <button className="btn-primary" onClick={routeSubmit}>
            Get Route
          </button>
        </div>
      </ScrollArea>
    </aside>
  );
}

export default DirectionsBar;
