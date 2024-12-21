"use client";
import React, { ComponentType, useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

interface GeocoderProps {
  accessToken: string;
  options: {
    language: string;
    country: string;
  };
  placeholder?: string;
  onRetrieve: (res: Result) => void;
}

const Geocoder = dynamic<GeocoderProps>(
  () =>
    import("@mapbox/search-js-react").then(
      (mod) => mod.Geocoder as unknown as ComponentType<GeocoderProps>
    ),
  { ssr: false }
);

interface Geometry {
  coordinates: [number, number];
}

interface Result {
  geometry: Geometry;
  properties: {
    full_address: string;
  };
}

const PostLocationForm = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [address, setAddress] = useState("");

  const handleRetrieve = (res: Result) => {
    console.log("selected location:", res);
    setLongitude(res.geometry.coordinates[0]);
    setLatitude(res.geometry.coordinates[1]);
    setAddress(res.properties.full_address);
  };

  return (
    <form>
      <div className="py-10 px-5 bg-primary max-w-md rounded-lg flex flex-col gap-4 light-label shadow-md mx-auto">
        <div className="grid w-full items-center gap-1.5">
          <Label>Search for an address</Label>
          <Geocoder
            accessToken="pk.eyJ1IjoiOWxvcmlhIiwiYSI6ImNtNDk0Z3lsODA2aWoybXE0eTMxc2Z4cDkifQ.mXmfJI17bHF8aXJ7fqsevQ"
            options={{
              language: "en",
              country: "CA",
            }}
            placeholder="Enter your address..."
            onRetrieve={handleRetrieve}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            readOnly
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              type="text"
              id="longitude"
              placeholder="Longitude"
              value={longitude}
              readOnly
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              type="text"
              id="latitude"
              placeholder="Latitude"
              value={latitude}
              readOnly
              required
            />
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Description</Label>
          <Textarea placeholder="Tell us more..." id="message" />
        </div>
        <button className="btn-dark">Submit</button>
      </div>
    </form>
  );
};

export default PostLocationForm;
