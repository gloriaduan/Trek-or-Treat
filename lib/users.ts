import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (e) {
    console.log(`error occurred: ${e}`);
    return { error: e };
  }
}

export async function getUserByClerkId(data: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: data } });
    return { user };
  } catch (e) {
    console.log(`error occurred: ${e}`);
    return { error: e };
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data,
    });
    return { user };
  } catch (e) {
    console.log(`error occurred: ${e}`);
    return { error: e };
  }
}

export async function deleteUser(id: string | undefined) {
  try {
    const user = await prisma.user.delete({ where: { id: id } });
    return { user };
  } catch (e) {
    console.log(`error occurred: ${e}`);
    return { error: e };
  }
}
