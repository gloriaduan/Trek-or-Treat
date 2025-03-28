"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

import { utapi } from "@/app/api/uploadthing/uploadthing";

export const deleteFile = async (key: string) => {
  const user = await currentUser();

  if (!key) {
    return {
      error: "File key required.",
      status: "ERROR",
    };
  }

  if (!user) {
    return {
      error: "Not authenticated.",
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
    console.log(`User ID: ${user.id}`);

    const postImages = data.images.map((image: any) => {
      return image.url;
    });

    const location = await prisma.location.create({
      data: {
        userId: user.id,
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
    const locations = await prisma.location.findMany({
      include: {
        ratings: {
          select: {
            value: true,
          },
        },
      },
    });

    const locationsWithAvgRating = locations.map((location) => {
      const avgRating =
        location.ratings.length > 0
          ? location.ratings.reduce((sum, rating) => sum + rating.value, 0) /
            location.ratings.length
          : 0;

      return { ...location, avgRating };
    });

    return {
      locationsWithAvgRating,
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

export const getLocation = async (id: string) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id },
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

export const submitRating = async (data: any) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Not authenticated.",
      status: "ERROR",
    };
  }

  try {
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: user.id,
        locationId: data.locationId,
      },
    });

    let rating;

    if (existingRating) {
      rating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: { value: data.rating },
      });
    } else {
      rating = await prisma.rating.create({
        data: {
          value: data.rating,
          user: {
            connect: { id: user.id },
          },
          location: {
            connect: { id: data.locationId },
          },
        },
      });
    }

    return {
      rating,
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
