"use client";
import React, { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "./ui/label";
import { API_KEY } from "@/lib/config";
import { Input } from "./ui/input";
import {
  useGeoJsonStore,
  useLayerStore,
  useLocationStore,
  useStartStore,
  useViewStore,
} from "@/store/app-store";
import type { Feature } from "geojson";
import { LineLayerSpecification } from "mapbox-gl";
import TransportationModeSelector from "./TransportationModeSelector";
import SaveModal from "./SaveModal";
import { useSearchParams } from "next/navigation";
import { map } from "svix/dist/cjs/openapi/rxjsStub";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

function DirectionsBar() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [canSave, setCanSave] = useState(false);
  const [steps, setSteps] = useState<{ maneuver: { instruction: string } }[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const addGeoJson = useGeoJsonStore((state) => state.addGeoJson);
  const addLayer = useLayerStore((state) => state.addLayer);
  const addStart = useStartStore((state) => state.addStart);
  const start = useStartStore((state) => state.start);
  const profile = useLocationStore((state) => state.profile);
  const locations = useLocationStore((state) => state.locations);
  const searchParams = useSearchParams();
  const setMapView = useViewStore((state) => state.setView);
  const mapView = useViewStore((state) => state.mapView);

  useEffect(() => {
    if (searchParams.get("from_saved") === "true") {
      routeSubmit();
    }
  }, []);

  useEffect(() => {
    setValue(start.address || "");
  }, [start]);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  const handleAutofillRetrieve = async (res: any) => {
    console.log(res);
    const destination = {
      id: res.features[0].properties.id,
      address: res.features[0].properties.place_name,
      longitude: res.features[0].geometry.coordinates[0],
      latitude: res.features[0].geometry.coordinates[1],
    };
    setValue(res.features[0].properties.place_name);
    addStart(destination);
  };

  const routeSubmit = async () => {
    if (locations.length >= 1 && Object.keys(start).length > 0) {
      setError("");
      setSteps([]);
      let destinationStrs = "";
      let startStr = `${start.longitude},${start.latitude};`;
      locations.forEach((location) => {
        destinationStrs += `${location.longitude},${location.latitude};`;
      });

      try {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startStr}${destinationStrs.substring(
            0,
            destinationStrs.length - 1
          )}?steps=true&geometries=geojson&access_token=${API_KEY}`,
          { method: "GET" }
        );
        const data = await res.json();
        console.log(data);
        const routeCoords = data.routes[0].geometry.coordinates;
        const routeSteps = data.routes[0].legs;

        for (let leg in routeSteps) {
          for (let step in routeSteps[leg].steps) {
            setSteps((prev) => [...prev, routeSteps[leg].steps[step]]);
          }
        }

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

        setMapView({
          longitude: start.longitude ?? mapView.longitude,
          latitude: start.latitude ?? mapView.latitude,
          zoom: 13,
        });

        setCanSave(true);
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Please enter a starting point and at least one destination.");
    }
  };

  const openSaveModal = () => {
    console.log("open save modal");
    setIsOpen(true);
  };

  return (
    <aside className="directions-bar bg-black md:max-w-sm w-full md:h-full-height h-52 p-3 md:py-10 md:px-5">
      <ScrollArea className="h-full rounded-md p-3">
        <div className="grid w-full items-center gap-3 mb-5">
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
          <TransportationModeSelector
            onModeChange={(mode) => console.log(`Selected mode: ${mode}`)}
            routeSubmit={routeSubmit}
          />
          {Object.keys(locations).length == 0 && (
            <p className="text-white/50">
              <span>
                <small>Enter an address or select a pin</small>
              </span>
            </p>
          )}
          {error && <p className="text-white/50">{error}</p>}
          {locations &&
            locations.map((location, i) => (
              <p className="text-muted" key={i}>
                {location.address}
              </p>
            ))}
          <button className="btn-primary" onClick={routeSubmit}>
            Get Route
          </button>
          <button
            className="btn-dark-50"
            disabled={canSave == false}
            onClick={openSaveModal}
          >
            Save Route
          </button>
        </div>
        <div className="directions">
          {steps.length > 0 && (
            <>
              <h3 className="mb-2 text-white">Directions</h3>
              <ol className="text-white flex flex-col gap-3">
                {steps.map((step, i) => {
                  const instruction = step.maneuver.instruction;

                  return (
                    <li
                      className={`p-2  rounded-md ${
                        instruction.includes("destination")
                          ? "bg-white/90 text-black"
                          : "bg-white/5 text-muted"
                      }`}
                      key={i}
                    >
                      {step.maneuver.instruction}
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </div>
      </ScrollArea>
      <SaveModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </aside>
  );
}

export default DirectionsBar;
