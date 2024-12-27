"use client";
import React, { ComponentType, useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import Link from "next/link";
import { CircleX } from "lucide-react";

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

  const [images, setImages] = useState<
    { key: string; name: string; url: string }[]
  >([]);

  const handleRetrieve = (res: Result) => {
    console.log("selected location:", res);
    setLongitude(res.geometry.coordinates[0]);
    setLatitude(res.geometry.coordinates[1]);
    setAddress(res.properties.full_address);
  };

  const handleDelete = async (key: string) => {
    try {
      const response = await fetch("/api/uploadthing/deleteFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (response.ok) {
        setImages((prev) => prev.filter((img) => img.key != key));
        console.log("file deleted");
      } else {
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const imgList = (
    <>
      <ul className="flex flex-col gap-2">
        {images.map((img) => (
          <li
            key={img.key}
            className="flex justify-between items-center gap-2 bg-white p-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Image
                src={img.url}
                alt={img.url}
                className="w-50"
                width={50}
                height={50}
              />
              <Link href={img.url} target="_blank">
                {img.name}
              </Link>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(img.key);
              }}
            >
              <CircleX />
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <form>
      <div className="py-10 px-5 bg-primary max-w-3xl rounded-lg flex flex-col gap-4 light-label shadow-md mx-auto">
        <div className="grid w-full items-center gap-1.5">
          <Label>Search for your address</Label>
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
        <div className="grid w-full gap-1.5">
          <UploadDropzone
            className="mt-4 bg-white/70 ut-label:text-black ut-allowed-content:text-primary ut-upload-icon:text-white ut-button:bg-primary ut-button:ut-readying:bg-primary"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                console.log("Files: ", res);
                setImages((prev) => [
                  ...prev,
                  ...res.map((file) => ({
                    key: file.key,
                    url: file.url,
                    name: file.name,
                  })),
                ]);
              }
              // Do something with the response
              // alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          {imgList}
        </div>
        <button className="btn-dark">Submit</button>
      </div>
    </form>
  );
};

export default PostLocationForm;
