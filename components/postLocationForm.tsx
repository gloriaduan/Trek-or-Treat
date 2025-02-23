"use client";
import React, { ComponentType, useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { locationSchema } from "@/lib/validation";
import { set, z } from "zod";
import { deleteFile, postLocation } from "@/lib/locations";
import { API_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<
    { key: string; name: string; url: string }[]
  >([]);
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      console.log("Form submitted.");
      const formValues = {
        address: address,
        longitude: longitude,
        latitude: latitude,
        description: formData.get("description") as string,
        images: images,
      };

      // console.log(formValues);

      await locationSchema.parseAsync(formValues);

      const response = await postLocation(formValues);

      if (response.status === "SUCCESS") {
        console.log("Location posted successfully");
        setErrors({});
        setLongitude(0);
        setLatitude(0);
        setAddress("");
        setImages([]);
        router.push("/");
        // return response;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        // console.log(fieldErrors);

        setErrors(fieldErrors as unknown as Record<string, string>);

        return { ...prevState, error: "Validation failed." };
      }

      return {
        ...prevState,
        error: "Failed to submit form.",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
  });

  const handleRetrieve = (res: Result) => {
    console.log("selected location:", res);
    setLatitude(res.geometry.coordinates[1]);
    setLongitude(res.geometry.coordinates[0]);
    setAddress(res.properties.full_address);
  };

  const handleDelete = async (key: string) => {
    try {
      const response = await deleteFile(key);

      if (response.status === "SUCCESS") {
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
                className="w-50 h-auto"
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
    <form action={formAction}>
      <div className="py-10 px-5 bg-primary max-w-3xl rounded-lg flex flex-col gap-4 light-label shadow-md mx-auto">
        <div className="grid w-full items-center gap-1.5">
          <Label>Search for your address</Label>
          <Geocoder
            accessToken={API_KEY}
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
          {errors.address && <p className="form-error">{errors.address}</p>}
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
            {errors.longitude && (
              <p className="form-error">{errors.longitude}</p>
            )}
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
            {errors.latitude && <p className="form-error">{errors.latitude}</p>}
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Description</Label>
          <Textarea
            placeholder="Tell us more..."
            id="message"
            name="description"
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <UploadDropzone
            className="mt-4 bg-white/70 ut-label:text-black ut-allowed-content:text-primary ut-upload-icon:text-white ut-button:bg-primary ut-button:ut-readying:bg-primary upload-progress"
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
          {errors.images && <p className="form-error">{errors.images}</p>}
          {imgList}
        </div>
        <button className="btn-dark" disabled={isPending ? true : false}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default PostLocationForm;
