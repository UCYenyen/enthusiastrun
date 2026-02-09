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

export async function checkRegistrationCount(
  category: "CATEGORY_5K" | "CATEGORY_10K",
  type: "super_early_bird" | "early_bird" | "regular" | "redeem_voucher",
): Promise<number> {
  try {
    const count = await prisma.registration.count({
      where: {
        category: category,
        type: type,
      },
    });
    return count;
  } catch (error) {
    return 100;
  }
}

export async function createRegistration(
  data: RegistrationData & { voucherId?: string },
): Promise<ActionResult<Registration>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      return { success: false, error: "User not found." };
    }

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        email: data.email,
        category: data.category,
        status: { not: "cancelled" },
      },
    });

    if (existingRegistration) {
      return { success: false, error: "Email already registered." };
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
          status: (data.type === "redeem_voucher"
            ? "confirmed"
            : "pending") as RegistrationStatus,
          type: data.type,
          updatedAt: new Date(),
          voucherId: data.voucherId || null,
          rekeningName: data.rekeningName || "-",
          chosenPackage: data.chosenPackage || "personal",
        },
      });

      if (data.voucherId) {
        await tx.voucher.update({
          where: { id: data.voucherId },
          data: { isUsed: true },
        });
      }

      return reg;
    });

    revalidatePath("/register");
    revalidatePath("/dashboard");

    return { success: true, data: registration as Registration };
  } catch (error) {
    return { success: false, error: "Failed to register." };
  }
}

export async function createBulkRegistration(
  dataList: (RegistrationData & { voucherId?: string })[],
): Promise<ActionResult<Registration[]>> {
  try {
    const firstData = dataList[0];
    if (
      firstData.chosenPackage === "ucstudent" &&
      firstData.type !== "early_bird"
    ) {
      return {
        success: false,
        error: "UC Student package only available for early bird registration",
      };
    }

    const registrations = await prisma.$transaction(async (tx) => {
      const qrCode = await tx.qRCode.create({
        data: { qrCodeUrl: "" },
      });

      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrCode.id}`;
      await tx.qRCode.update({
        where: { id: qrCode.id },
        data: { qrCodeUrl },
      });

      const results = [];
      for (const data of dataList) {
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
            status: "pending",
            type: data.type,
            qrCodeId: qrCode.id,
            rekeningName: data.rekeningName || "-",
            chosenPackage: data.chosenPackage || "personal",
          },
        });
        results.push(reg);
      }
      return results;
    });

    revalidatePath("/dashboard/admin");
    return { success: true, data: registrations as Registration[] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateRegistrationStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled",
) {
  try {
    const target = await prisma.registration.findUnique({
      where: { id },
      select: { qrCodeId: true },
    });

    if (!target || !target.qrCodeId)
      return { success: false, error: "Registration or QR Group not found" };

    await prisma.registration.updateMany({
      where: { qrCodeId: target.qrCodeId },
      data: {
        status,
        paymentStatus:
          status === "confirmed"
            ? true
            : status === "cancelled"
              ? false
              : undefined,
      },
    });

    revalidatePath("/dashboard/admin");
    return {
      success: true,
      message: `Successfully updated the entire registration group.`,
    };
  } catch (error) {
    return { success: false, error: "Failed to perform update" };
  }
}

export async function makeQRCode(registrationID: string) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id: registrationID },
    });
    if (!registration) return { success: false, error: "Not found" };

    const newQRCode = await prisma.qRCode.create({ data: { qrCodeUrl: "" } });
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${newQRCode.id}&size=200x200`;

    await prisma.qRCode.update({
      where: { id: newQRCode.id },
      data: { qrCodeUrl },
    });

    await prisma.registration.update({
      where: { id: registrationID },
      data: { qrCodeId: newQRCode.id },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "QR Error" };
  }
}

export async function validateRegistrationQR(
  qrCodeId: string,
): Promise<ActionResult<Registration[]>> {
  try {
    const registrations = await prisma.registration.findMany({
      where: { qrCodeId: qrCodeId },
      orderBy: { fullName: "asc" },
    });
    if (registrations.length === 0)
      return { success: false, error: "Invalid QR" };
    return { success: true, data: registrations as Registration[] };
  } catch (error) {
    return { success: false, error: "Error" };
  }
}

export async function claimRacePack(
  registrationId: string,
): Promise<ActionResult<Registration>> {
  try {
    const updated = await prisma.registration.update({
      where: { id: registrationId },
      data: { qrCodeClaimed: true, qrCodeClaimedAt: new Date() },
    });
    revalidatePath("/dashboard");
    return { success: true, data: updated as Registration };
  } catch (error) {
    return { success: false, error: "Failed" };
  }
}

export async function getUserRegistration(
  userId: string,
): Promise<Registration | null> {
  return (await prisma.registration.findFirst({
    where: { userId },
    include: { qrCode: true },
    orderBy: { createdAt: "desc" },
  })) as Registration | null;
}

export async function isAcceptedRegistration(userId: string): Promise<boolean> {
  const reg = await prisma.registration.findFirst({
    where: { userId, status: "confirmed" },
  });
  return !!reg;
}

export async function getAllRegistrations(): Promise<Registration[]> {
  const allData = await prisma.registration.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return allData as Registration[];
}

export async function getGroupParticipants(
  qrCodeId: string,
): Promise<Registration[]> {
  return (await prisma.registration.findMany({
    where: { qrCodeId: qrCodeId },
    orderBy: { fullName: "asc" },
  })) as Registration[];
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
