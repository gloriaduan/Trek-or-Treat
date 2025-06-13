"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";
import type {
  AddRouteInput,
  UpdateRouteInput,
  RouteLocationInput,
} from "./routeTypes";

export const addRoute = async (data: AddRouteInput) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Not authenticated.",
      status: "ERROR",
    };
  }

  try {
    const newRoute = await prisma.route.create({
      data: {
        userId: user.id,
        name: data.name,
        description: data.description,
        locations: {
          create: data.locations.map((location: RouteLocationInput) => ({
            location: { connect: { id: location.id } },
          })),
        },
      },
    });

    return {
      newRoute,
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

export const getRoutes = async () => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Not authenticated.",
      status: "ERROR",
    };
  }

  try {
    const routes = await prisma.route.findMany({
      where: { userId: user.id },
      include: {
        locations: {
          include: {
            location: true, // Fetch detailed Location info
          },
        },
      },
    });

    return {
      routes,
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

export const updateRoute = async (routeId: string, data: UpdateRouteInput) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Not authenticated.",
      status: "ERROR",
    };
  }

  try {
    const updatedRoute = await prisma.route.update({
      where: { id: routeId },
      data: {
        name: data.name,
        description: data.description,
      },
      include: {
        locations: {
          include: {
            location: true, // Fetch detailed Location info
          },
        },
      },
    });

    return {
      updatedRoute,
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

export const deleteRoute = async (routeId: string) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Not authenticated.",
      status: "ERROR",
    };
  }

  try {
    const deletedRoute = await prisma.route.delete({
      where: { id: routeId },
    });

    return {
      deletedRoute,
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
