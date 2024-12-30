"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

import { utapi } from "@/app/api/uploadthing/uploadthing";

export const deleteFile = async (key: string) => {
  if (!key) {
    return {
      error: "File key required.",
      status: "ERROR",
    };
  }

  try {
    await utapi.deleteFiles([key]);
    return {
      status: "SUCCESS",
    };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      error: "Error deleting file.",
      status: "ERROR",
    };
  }
};

export const postLocation = async (data: any) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Not authenticated.",
      status: "ERROR",
    };
  }

  try {
    const postImages = data.images.map((image: any) => {
      return image.url;
    });

    const location = await prisma.location.create({
      data: {
        address: data.address,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        images: postImages,
      },
    });

    return {
      location,
      status: "SUCCESS",
    };
  } catch (error) {
    console.log(`error occurred: ${error}`);
    return {
      error,
      status: "ERROR",
    };
  }
};

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany();

    return {
      locations,
      status: "SUCCESS",
    };
  } catch (error) {
    console.log(`error occurred: ${error}`);
    return {
      error,
      status: "ERROR",
    };
  }
};
