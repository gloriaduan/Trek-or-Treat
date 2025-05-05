"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const addRoute = async (data: any) => {
  const user = await currentUser();

  console.log(data);

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
          create: data.locations.map((location: any) => ({
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
