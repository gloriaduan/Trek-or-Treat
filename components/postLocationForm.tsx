"use client"
import React from 'react'
import dynamic from 'next/dynamic';

const Geocoder = dynamic(
    () => import("@mapbox/search-js-react").then((mod) => mod.Geocoder),
    { ssr: false }
);

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";


const PostLocationForm = () => {
    return (
        <form>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Address</Label>
                <Geocoder
                    accessToken="pk.eyJ1IjoiOWxvcmlhIiwiYSI6ImNtNDk0Z3lsODA2aWoybXE0eTMxc2Z4cDkifQ.mXmfJI17bHF8aXJ7fqsevQ"
                    options={{
                        language: 'en',
                        country: 'CA'
                    }}
                    placeholder="Enter your address"
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="longitude">Longitude</Label>
                <Input type="text" id="longitude" placeholder="Longitude" required/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="latitude">Latitude</Label>
                <Input type="text" id="latitude" placeholder="Latitude" required/>
            </div>
        </form>
    )
}

export default PostLocationForm
