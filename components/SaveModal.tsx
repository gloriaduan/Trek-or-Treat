"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocationStore, useStartStore } from "@/store/app-store";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useActionState, useState } from "react";
import { routeSaveSchema } from "@/lib/validation";
import { z } from "zod";
import { addRoute } from "@/lib/route";

interface SaveModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: string;
  routeData?: routeData;
}

interface routeData {
  id: string;
  title: string;
  description: string;
}

function SaveModal({ isOpen, setIsOpen, type, routeData }: SaveModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const start = useStartStore((state) => state.start);
  const locations = useLocationStore((state) => state.locations);

  const handleSaveRoute = async (prevState: any, formData: FormData) => {
    try {
      console.log("submitting form");
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

  const [state, formAction, isPending] = useActionState(handleSaveRoute, {
    error: "",
  });

  const isEmpty = !routeData || Object.keys(routeData).length === 0;

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
              {type === "save" ? "Save This Route" : "Edit Route"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {type === "save"
              ? "Enter a title and description"
              : "Edit your route's title and description"}
          </DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="title">Title</Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  name="title"
                  defaultValue={!isEmpty ? routeData?.title : ""}
                  placeholder="My Route"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="description">Description</Label>
              <div className="col-span-3">
                <Textarea
                  placeholder="More information..."
                  id="description"
                  name="description"
                  defaultValue={!isEmpty ? routeData?.description : ""}
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
