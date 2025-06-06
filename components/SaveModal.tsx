"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocationStore, useStartStore } from "@/store/app-store";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useActionState, useState } from "react";
import { routeSaveSchema } from "@/lib/validation";
import { z } from "zod";
import { addRoute, updateRoute } from "@/lib/route";
import { useRouteStore } from "@/store/app-store";
import { updateLocation } from "@/lib/locations";

interface SaveModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: string;
  data?: data;
  itemType?: "route" | "post";
  onSuccess?: (id: string, newDescription: string) => void;
}

interface data {
  id: string;
  title: string;
  description: string;
}

function SaveModal({
  isOpen,
  setIsOpen,
  type,
  data,
  itemType = "route",
  onSuccess,
}: SaveModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const start = useStartStore((state) => state.start);
  const locations = useLocationStore((state) => state.locations);
  const routes = useRouteStore.getState().routes;
  const setRoutes = useRouteStore((state) => state.setRoutes);

  const handleSaveRoute = async (prevState: any, formData: FormData) => {
    try {
      console.log("saving route...");
      const formValues = {
        name: formData.get("title") as string,
        description: formData.get("description") as string,
      };

      await routeSaveSchema.parseAsync(formValues);

      const locationList = [start, ...locations];

      const data = { ...formValues, locations: locationList };

      const response = await addRoute(data);

      if (response.status === "SUCCESS") {
        console.log("Route saved successfully.");
        setErrors({});
      } else {
        setErrors({ general: "Please log in to save routes." });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, error: "Validation failed." };
      }

      return {
        ...prevState,
        error: "Failed to submit form.",
      };
    }
  };

  const handleUpdateRoute = async (prevState: any, formData: FormData) => {
    try {
      console.log("updating...");
      const formValues = {
        name: formData.get("title") as string,
        description: formData.get("description") as string,
      };

      await routeSaveSchema.parseAsync(formValues);

      if (!data) {
        setErrors({ general: "No data provided for update." });
        return { ...prevState, error: "No data provided for update." };
      }

      // Handle different item types
      if (itemType === "post") {
        const response = await updateLocation(data.id, formValues.description);

        if (response.error) {
          setErrors({ general: response.error as string });
          return { ...prevState, error: response.error };
        } else {
          console.log("Post updated successfully.");
          setErrors({});
          setIsOpen(false);

          if (onSuccess) {
            onSuccess(data.id, formValues.description);
          }
          return { ...prevState };
        }
      } else {
        const response = await updateRoute(data.id, formValues);

        if (response.status === "SUCCESS") {
          console.log("Route updated successfully.");
          setErrors({});
          console.log(response);
          setRoutes(
            routes.map((route) =>
              route.id === data.id && response.updatedRoute
                ? response.updatedRoute
                : route
            )
          );
          setIsOpen(false);
        } else {
          setErrors({ general: "Please log in to update routes." });
        }
      }
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, error: "Validation failed." };
      }

      return {
        ...prevState,
        error: "Failed to submit form.",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(
    type === "edit" ? handleUpdateRoute : handleSaveRoute,
    {
      error: "",
    }
  );

  const isEmpty = !data || Object.keys(data).length === 0;

  const isTitleEditable = itemType !== "post";

  const titleLabel = itemType === "post" ? "Address" : "Title";
  const descriptionLabel = "Description";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="mb-2">
              {type === "save"
                ? "Save This Route"
                : `Edit ${itemType === "post" ? "Post" : "Route"}`}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {type === "save"
              ? "Enter a title and description"
              : `Edit your ${
                  itemType === "post" ? "post" : "route"
                }'s description`}
          </DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="title">{titleLabel}</Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  name="title"
                  defaultValue={!isEmpty ? data?.title : ""}
                  placeholder={itemType === "post" ? "Address" : "My Route"}
                  readOnly={!isTitleEditable}
                  className={!isTitleEditable ? "bg-gray-100" : ""}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="description">{descriptionLabel}</Label>
              <div className="col-span-3">
                <Textarea
                  placeholder="More information..."
                  id="description"
                  name="description"
                  defaultValue={!isEmpty ? data?.description : ""}
                />
                {errors.description && (
                  <p className="form-error">{errors.description}</p>
                )}
              </div>
            </div>
          </div>
          {errors.general && (
            <p className="form-error mb-3 text-sm">{errors.general}</p>
          )}
          <DialogFooter className="sm:justify-stretch sm:flex-col">
            <button className="btn-primary" disabled={isPending ? true : false}>
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SaveModal;
