"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "./ui/label";
import { API_KEY } from "@/lib/config";
import { Input } from "./ui/input";
import { useLocationStore } from "@/store/app-store";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

function DirectionsBar() {
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  const locations = useLocationStore((state) => state.locations);

  const handleAutofillRetrieve = (res: any) => {
    console.log(res);
  };

  return (
    <aside className="directions-bar bg-black md:max-w-xs w-full md:h-full-height h-52 p-3 md:py-10 md:px-5">
      <ScrollArea className="h-full rounded-md p-3">
        <div className="grid w-full items-center gap-3">
          <form action="">
            <AddressAutofill
              accessToken={`${API_KEY}`}
              onRetrieve={handleAutofillRetrieve}
            >
              <Label htmlFor="address">Choose a starting point:</Label>
              <Input
                type="text"
                id="address"
                placeholder="Enter a place..."
                // value={value}
                // onChange={handleChange}
              />
            </AddressAutofill>
          </form>
          {locations &&
            locations.map((location, i) => (
              <p className="text-white" key={i}>
                {location.address}
              </p>
            ))}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default DirectionsBar;
