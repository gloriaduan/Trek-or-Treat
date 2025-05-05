"use client";

import { useState, useEffect } from "react";
import { Edit, MoreVertical, Navigation, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { getLocation } from "@/lib/locations";
import {
  useLocationStore,
  useRouteStore,
  useStartStore,
} from "@/store/app-store";
import { useRouter } from "next/navigation";
import { deleteRoute } from "@/lib/route";

// Update the interface to make the removed fields optional
interface RouteCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  locations?: any;
}

// Update the component props to remove the unused parameters
export default function RouteCard({
  id,
  title,
  description,
  date,
  imageUrl = "/placeholder.svg?height=100&width=200",
  locations,
}: RouteCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const addDestination = useLocationStore((state) => state.addDestination);
  const clearDestinations = useLocationStore(
    (state) => state.clearDestinations
  );
  const addStart = useStartStore((state) => state.addStart);
  const router = useRouter();
  const removeRoute = useRouteStore((state) => state.removeRoute);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleEdit = (id: string) => {
    console.log(`Editing route ${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log(`Deleting route ${id}`);
    try {
      const response = await deleteRoute(id);

      if (response.status === "SUCCESS") {
        console.log("Route deleted successfully.");
        removeRoute(id);
      }
    } catch (error) {}
  };

  const handleUse = (id: string) => {
    console.log(`Using route ${id}`);

    clearDestinations();

    locations.forEach((location: any, index: number) => {
      let location_obj = {
        id: location.location.id,
        address: location.location.address,
        longitude: location.location.longitude,
        latitude: location.location.latitude,
      };

      if (index === 0) {
        addStart(location_obj);
      } else {
        addDestination(location_obj);
      }
    });

    router.push("/?from_saved=true");
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-[100px]">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={`Map preview for ${title}`}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(id)}
                className="text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {description || "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-xs text-muted-foreground">
          Saved on {new Date(date).toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end pt-2">
        <Button
          onClick={() => handleUse(id)}
          size="sm"
          className="gap-1 hover:bg-black"
        >
          <Navigation className="h-3 w-3" />
          Use
        </Button>
      </CardFooter>
    </Card>
  );
}
