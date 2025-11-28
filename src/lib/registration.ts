"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action.md";
import {
  RegistrationData,
  Registration,
  RegistrationStatus,
} from "@/types/registration.md";

export async function createRegistration(
  data: RegistrationData
): Promise<ActionResult<Registration>> {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found. Please login again.",
      };
    }

    // Check if user already registered
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userId: data.userId,
      },
    });

    if (existingRegistration) {
      return {
        success: false,
        error: "You have already registered for this event",
      };
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        city: data.city,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        category: data.category,
        bloodType: data.bloodType,
        medicalCondition: data.medicalCondition,
        photoUrl: data.photoUrl,
        photoPublicId: data.photoPublicId,
        idCardUrl: data.idCardUrl,
        idCardPublicId: data.idCardPublicId,
        jerseySize: data.jerseySize,
        paymentProofUrl: data.paymentProofUrl,
        paymentProofId: data.paymentProofId,
        status: "pending",
      },
    });

    revalidatePath("/register");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: registration as Registration,
      message: "Registration successful! Please wait for confirmation.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Failed to register. Please try again.",
    };
  }
}

export async function getUserRegistration(
  userId: string
): Promise<Registration | null> {
  try {
    const registration = await prisma.registration.findFirst({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return registration as Registration | null;
  } catch (error) {
    console.error("Failed to get registration:", error);
    return null;
  }
}

export async function getAllRegistrations(): Promise<Registration[]> {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return registrations as Registration[];
  } catch (error) {
    console.error("Failed to get registrations:", error);
    return [];
  }
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<ActionResult<Registration>> {
  try {

    const registration = await prisma.registration.update({
      where: { id },
      data: { status },
    });
    
    if(!registration){
      return {
        success: false,
        error: "Failed to update registration",
      };
    }

    if(status == "confirmed"){
      const paymentStatus = await prisma.registration.update({
        where: { id },
        data: { paymentStatus: true },
      })

      if(!paymentStatus){
        return {
          success: false,
          error: "Failed to update payment status",
        };
      }
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      data: registration as Registration,
      message: `Registration ${status} successfully`,
    };
  } catch (error) {
    console.error("Failed to update registration:", error);
    return {
      success: false,
      error: "Failed to update registration status",
    };
  }
}