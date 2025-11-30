import { NextResponse } from "next/server";
import { getRegistrationById, checkInRegistration } from "@/lib/registration";

/**
 * Route handler untuk validasi QR Code dan Check-in.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Asumsikan qrCodeData adalah langsung Registration ID
    const registrationId: string = body.qrCodeData;

    if (!registrationId) {
      return NextResponse.json(
        { message: "QR Code data (Registration ID) is missing." },
        { status: 400 }
      );
    }

    // 1. Ambil Data Registrasi berdasarkan ID
    const registration = await getRegistrationById(registrationId);

    if (!registration) {
      // 404: ID tidak ditemukan di database
      return NextResponse.json(
        {
          message: `❌ Error: Registration ID '${registrationId}' not found.`,
          userData: null,
        },
        { status: 404 }
      );
    }

    // 2. Lakukan Validasi Status

    // Asumsikan status 'confirmed' berarti siap untuk check-in.
    if (registration.status === "confirmed") {
      // Lakukan proses Check-in
      const checkInResult = await checkInRegistration(registrationId);

      if (checkInResult.success) {
        // 200: Check-in berhasil
        return NextResponse.json(
          {
            message: `✅ Check-in Success! Selamat datang, ${registration.fullName}.`,
            userData: registration,
          },
          { status: 200 }
        );
      } else {

        if (registration.qrCodeClaimed === true) {
          // 409: Sudah pernah check-in
          return NextResponse.json(
            {
              message: `❌ User ${registration.fullName} sudah mengambil pada: ${new Date(
                registration.qrCodeClaimedAt!
              ).toLocaleString()}.`,
              userData: registration,
            },
            { status: 409 }
          );
        }
        // 500: Gagal memperbarui status check-in
        return NextResponse.json(
          {
            message: `⚠️ Database Error: Failed to complete check-in. ${checkInResult.error}`,
            userData: registration,
          },
          { status: 500 }
        );
      }
    } else if (registration.status === "pending") {
      // 403: Registrasi masih pending (belum dikonfirmasi)
      return NextResponse.json(
        {
          message: `⚠️ Warning: Registration for ${registration.fullName} is PENDING. Payment not confirmed.`,
          userData: registration,
        },
        { status: 403 }
      );
    } else if (registration.status === "cancelled") {
      // 410: Registrasi dibatalkan
      return NextResponse.json(
        {
          message: `❌ Registration Cancelled: User ${registration.fullName} registration was cancelled.`,
          userData: registration,
        },
        { status: 410 }
      );
    }

    // Default Fallback
    return NextResponse.json(
      {
        message: `⚠️ Warning: Unhandled registration status (${registration.status}).`,
        userData: registration,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("API Error during QR validation:", error);
    return NextResponse.json(
      { message: "❌ Internal Server Error during validation process." },
      { status: 500 }
    );
  }
}

// Hanya izinkan POST
export const GET = () =>
  NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
