"use client";

import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { getRoutes, deleteRoute } from "@/lib/route";
import {
  useRouteStore,
  useLocationStore,
  useStartStore,
} from "@/store/app-store";
import SaveModal from "@/components/SaveModal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HalloweenLoading from "@/components/SpookyLoading";

function SavedRoutesPage() {
  const routes = useRouteStore((state) => state.routes);
  const setRoutes = useRouteStore((state) => state.setRoutes);
  const removeRouteFromStore = useRouteStore((state) => state.removeRoute);

  const addDestination = useLocationStore((state) => state.addDestination);
  const clearDestinations = useLocationStore(
    (state) => state.clearDestinations
  );
  const addStart = useStartStore((state) => state.addStart);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRouteDataForModal, setCurrentRouteDataForModal] =
    useState<null | { id: string; title: string; description: string }>(null);

  useEffect(() => {
    async function fetchRoutes() {
      setLoading(true);
      try {
        const res = await getRoutes();
        setRoutes(
          (res.routes || []).map((route) => ({
            id: route.id,
            userId: route.userId,
            name: route.name,
            description: route.description,
            createdAt: new Date(route.createdAt),
            locations: (route.locations || []).map((loc) => ({
              routeId: loc.routeId,
              locationId: loc.locationId,
              location: {
                id: loc.location.id,
                userId: loc.location.userId,
                address: loc.location.address,
                description: loc.location.description,
                latitude: loc.location.latitude,
                longitude: loc.location.longitude,
                images: loc.location.images,
                createdAt: new Date(loc.location.createdAt),
              },
            })),
          }))
        );
      } catch (error: unknown) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRoutes();
  }, [setRoutes]);

  const handleRouteDelete = async (id: string) => {
    console.log(`Deleting route ${id}`);
    try {
      const response = await deleteRoute(id);
      if (response.status === "SUCCESS") {
        console.log("Route deleted successfully.");
        toast.success("Route deleted successfully.");
        removeRouteFromStore(id);
      } else {
        console.error("Failed to delete route:", response.error);
        toast.error(
          `Error deleting route: ${response.error || "Unknown error"}`
        );
      }
    } catch (error: unknown) {
      toast.error(`Error deleting route: ${(error as Error).message}`);
    }
  };

  const handleRouteEdit = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId);
    if (route) {
      setCurrentRouteDataForModal({
        id: route.id,
        title: route.name,
        description: route.description,
      });
      setEditDialogOpen(true);
    }
  };

  const handleRouteUse = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId);
    if (!route || !route.locations) return;

    console.log(`Using route ${routeId}`);
    clearDestinations();
    route.locations.forEach((locationItem, index) => {
      const location_obj = {
        id: locationItem.location.id,
        address: locationItem.location.address,
        longitude: locationItem.location.longitude,
        latitude: locationItem.location.latitude,
      };
      if (index === 0) {
        addStart(location_obj);
      } else {
        addDestination(location_obj);
      }
    });
    router.push("/explore?from_saved=true");
  };

  if (loading) {
    return <HalloweenLoading />;
  }

  return (
    <>
      {currentRouteDataForModal && (
        <SaveModal
          isOpen={editDialogOpen}
          setIsOpen={setEditDialogOpen}
          type="edit"
          data={currentRouteDataForModal}
        />
      )}
      <div className="py-16 dark-bg flex-1">
        <div className="container">
          <h1 className="mb-6 text-3xl font-bold">Saved Routes</h1>
          {routes.length === 0 && !loading ? (
            <p>You haven&apos;t saved any routes yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => (
                <ItemCard
                  key={route.id}
                  id={route.id}
                  title={route.name}
                  description={route.description}
                  date={route.createdAt.toISOString()}
                  imageUrl={route.locations?.[0]?.location?.images?.[0]}
                  itemType="route"
                  primaryActionText="Use"
                  onDelete={() => handleRouteDelete(route.id)}
                  onEdit={() => handleRouteEdit(route.id)}
                  onPrimaryAction={() => handleRouteUse(route.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SavedRoutesPage;
