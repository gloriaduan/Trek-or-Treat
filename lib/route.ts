"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const addRoute = async (data: any) => {
  const user = await currentUser();

  console.log(data.locations)

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
