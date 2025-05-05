"use client";

import { useEffect, useState } from "react";
import RouteCard from "@/components/RouteCard";
import { getRoutes } from "@/lib/route";
import { useRouteStore } from "@/store/app-store";

function Page() {
  interface Route {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    locations: {
      location: {
        id: string;
        userId: string;
        description: string;
        createdAt: Date;
        images: string[];
        address: string;
        latitude: number;
        longitude: number;
      };
      routeId: string;
      locationId: string;
    }[];
  }

  const routes = useRouteStore((state) => state.routes);
  const setRoutes = useRouteStore((state) => state.setRoutes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const res = await getRoutes();
        console.log(res);
        setRoutes(res.routes || []);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRoutes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Saved Routes</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              id={route.id}
              title={route.name}
              description={route.description}
              date={route.createdAt.toISOString()}
              imageUrl={route.locations[0].location.images[0]}
              locations={route.locations}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
