import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { category } = await request.json();

    if (!category || !["CATEGORY_5K", "CATEGORY_10K"].includes(category)) {
      return NextResponse.json(
        { success: false, message: "Kategori tidak valid" },
        { status: 400 }
      );
    }

    const voucher = await prisma.voucher.create({
      data: {
        category: category,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Voucher berhasil dibuat",
      voucher,
    });
  } catch (error) {
    console.error("Create voucher error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}