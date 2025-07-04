"use client";
import React, { useEffect, useState, useCallback } from "react";
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
import type { AddressAutofillRetrieveResponse } from "@mapbox/search-js-core";

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

  const routeSubmit = useCallback(
    async (mode: string) => {
      console.log(mode);
      if (locations.length >= 1 && Object.keys(start).length > 0) {
        setError("");
        setSteps([]);
        let destinationStrs = "";
        const startStr = `${start.longitude},${start.latitude};`;
        locations.forEach((location) => {
          destinationStrs += `${location.longitude},${location.latitude};`;
        });
        try {
          const res = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/${mode}/${startStr}${destinationStrs.substring(
              0,
              destinationStrs.length - 1
            )}?steps=true&geometries=geojson&access_token=${API_KEY}`,
            { method: "GET" }
          );
          const data = await res.json();
          // console.log(data);
          const routeCoords: number[][] = data.routes[0].geometry.coordinates;
          const routeSteps: Array<{
            steps: { maneuver: { instruction: string } }[];
          }> = data.routes[0].legs;

          for (const leg of routeSteps) {
            for (const step of leg.steps) {
              setSteps((prev) => [...prev, step]);
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
        } catch (e) {
          setError(`An error occurred. Please try again. {${e}}`);
        }
      } else {
        setError("Please enter a starting point and at least one destination.");
      }
    },
    [
      locations,
      start,
      addGeoJson,
      addLayer,
      setMapView,
      mapView.longitude,
      mapView.latitude,
    ]
  );

  useEffect(() => {
    if (searchParams.get("from_saved") === "true") {
      routeSubmit(profile); // use current profile from store for this case
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(start.address || "");
  }, [start]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAutofillRetrieve = async (
    res: AddressAutofillRetrieveResponse
  ) => {
    if (!res.features || !res.features[0]) return;
    const feature = res.features[0];
    const destination = {
      id: feature.properties.mapbox_id || "",
      address:
        feature.properties.place_name || feature.properties.feature_name || "",
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
    };
    setValue(destination.address);
    addStart(destination);
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
              data-testid="start-destination-input"
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
          <div data-testid="destinations-list">
            {locations &&
              locations.map((location, i) => (
                <p
                  data-testid="destination-item"
                  className="text-muted"
                  key={i}
                >
                  {location.address}
                </p>
              ))}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="btn-primary"
            onClick={() => routeSubmit("driving")}
          >
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
      <SaveModal isOpen={isOpen} setIsOpen={setIsOpen} type="save" />
    </aside>
  );
}

export default DirectionsBar;
