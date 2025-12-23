"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action.md";
import {
  RegistrationData,
  Registration,
  RegistrationStatus,
  Voucher,
} from "@/types/registration.md";

export async function checkRegistrationCount(category: "CATEGORY_5K" | "CATEGORY_10K", type: "super_early_bird" | "early_bird" | "regular" | "redeem_voucher"): Promise<number> {
  try {
    const count = await prisma.registration.count({
      where: {
        category: category,
        type: type,
      },
    });
    return count;
  } catch (error) {
    console.error("Failed to check registration count:", error);
    return 100;
  }
}

export async function createRegistration(
  data: RegistrationData & { voucherId?: string }
): Promise<ActionResult<Registration>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found. Please login again.",
      };
    }

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

    const registration = await prisma.$transaction(async (tx) => {
      const reg = await tx.registration.create({
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
          status: `${data.type === "redeem_voucher" ? "confirmed" : "pending"}` as RegistrationStatus,
          type: data.type,
          updatedAt: new Date(),
          voucherId: data.voucherId || null,
          rekeningName: data.rekeningName || "-",
        },
      });

      if (data.voucherId) {
        await prisma.voucher.update({
          where: { id: data.voucherId },
          data: { isUsed: true }
        });
      }

      return reg;
    });

    revalidatePath("/register");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: registration as Registration,
      message: "Registration successful!",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Failed to register. Please try again.",
    };
  }
}

export async function makeVoucher(category: "CATEGORY_10K" | "CATEGORY_5K") {
  await prisma.voucher.create({
    data: {
      category: category,
    },
  });
}

export async function deleteVoucher(id: string) {
  await prisma.voucher.delete({
    where: { id },
  });
}

export async function useVoucher(id: string): Promise<ActionResult<Voucher>> {
  try {
    const voucher = await prisma.voucher.update({
      where: { id },
      data: { isUsed: true },
    });

    return {
      success: true,
      data: voucher as Voucher,
      message: "Voucher used successfully",
    };
  } catch (error) {
    console.error("Failed to use voucher:", error);
    return {
      success: false,
      error: "Failed to use voucher",
    };
  }
}

export async function getAllVouchers(): Promise<Voucher[]> {
  return await prisma.voucher.findMany({
    orderBy: { id: "desc" },
  });
}

export async function makeQRCode(registrationID: string) {
  const regID = await prisma.registration.findUnique({
    where: { id: registrationID },
  });
  if (!regID) {
    return { success: false, error: "Registration not found" };
  }
  try {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${registrationID}&size=200x200`;
    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationID },
      data: { qrCodeUrl: qrCodeUrl },
    });
    return { success: true, data: updatedRegistration as Registration };
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    return { success: false, error: "Failed to generate QR code" };
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

export async function getRegistrationById(
  id: string
): Promise<Registration | null> {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id },
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
    console.error("Failed to get registration by ID:", error);
    return null;
  }
}

export async function checkInRegistration(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    if (registration.qrCodeClaimed) {
      return { success: false, error: "QR Code has already been claimed" };
    }

    await prisma.registration.update({
      where: { id },
      data: { qrCodeClaimed: true, qrCodeClaimedAt: new Date() },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to check-in registration:", error);
    return { success: false, error: "Failed to check-in registration" };
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

    if (!registration) {
      return {
        success: false,
        error: "Failed to update registration",
      };
    }

    if (status == "confirmed") {
      const paymentStatus = await prisma.registration.update({
        where: { id },
        data: { paymentStatus: true },
      });

      const qrCode = await makeQRCode(registration.id);

      if (!qrCode.success) {
        return {
          success: false,
          error: qrCode.error,
        };
      }

      if (!paymentStatus) {
        return {
          success: false,
          error: "Failed to update payment status",
        };
      }
    } else if (status == "cancelled") {
      await prisma.registration.update({
        where: { id },
        data: { paymentStatus: false },
      });
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