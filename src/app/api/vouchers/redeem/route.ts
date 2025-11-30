import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    console.log("Received voucher id:", id); // Debug log

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID voucher tidak diberikan" },
        { status: 400 }
      );
    }

    // Cari voucher di database
    const voucher = await prisma.voucher.findUnique({
      where: { id: id },
    });

    console.log("Found voucher:", voucher); // Debug log

    if (!voucher) {
      return NextResponse.json(
        { success: false, message: "Kode voucher tidak ditemukan" },
        { status: 404 }
      );
    }

    if (voucher.isUsed) {
      return NextResponse.json(
        { success: false, message: "Kode voucher sudah digunakan" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kode voucher valid!",
      category: voucher.category,
    });
  } catch (error) {
    console.error("Redeem code error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}