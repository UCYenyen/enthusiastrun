"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action.md";
import { User, UserData } from "@/types/user.md";
import { Role } from "@prisma/client";

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function editUserRole(
  id: string,
  role: Role
): Promise<ActionResult<UserData>> {
  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return {
      success: false,
      error: "Failed to update user role. Please try again.",
    };
  }
}

export async function editUserName(id: string, newName: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name: newName },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Failed to update user name:", error);
    return {
      success: false,
      error: "Failed to update user name. Please try again.",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user. Please try again.");
  }
}
