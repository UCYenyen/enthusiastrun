"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ParticipantForm from "./ParticipantForm";
import { UploadWidget } from "@/components/CloudinaryWidget";
import { createRegistration } from "@/lib/registration";
import { RegistrationCategory } from "@/types/registration.md";

export interface ParticipantData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  city: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  jerseySize: string;
  medicalCondition: string;
  idCardUrl: string;
  idCardPublicId: string;
}

const emptyParticipant: ParticipantData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  bloodType: "",
  city: "",
  address: "",
  emergencyContact: "",
  emergencyPhone: "",
  jerseySize: "",
  medicalCondition: "",
  idCardUrl: "",
  idCardPublicId: "",
};

const JERSEY_XL_EXTRA = 10000;
const JERSEY_XXL_EXTRA = 15000;

interface RedeemCodeResponse {
  success: boolean;
  message?: string;
  discount?: number;
  maxParticipants?: number;
  category?: "CATEGORY_5K" | "CATEGORY_10K";
}

export default function RedeemCodeForm() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Redeem code state
  const [redeemCode, setRedeemCode] = useState("");
  
  // Form state
  const [participants, setParticipants] = useState<ParticipantData[]>([{ ...emptyParticipant }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Calculate total price (with discount)
  const calculateTotal = () => {
    const basePrice = 0; // Free registration with voucher

    // Add jersey size extras (still need to pay for XL/XXL)
    const jerseyExtras = participants.reduce((total, p) => {
      if (p.jerseySize === "XL") return total + JERSEY_XL_EXTRA;
      if (p.jerseySize === "XXL") return total + JERSEY_XXL_EXTRA;
      return total;
    }, 0);

    return basePrice + jerseyExtras;
  };

  const updateParticipant = (index: number, data: Partial<ParticipantData>) => {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...data };
      return updated;
    });
  };

  const validateForm = () => {
    if (!redeemCode.trim()) {
      toast.error("Mohon masukkan kode voucher");
      return false;
    }

    // Check all required fields for each participant
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (
        !p.fullName ||
        !p.email ||
        !p.phoneNumber ||
        !p.dateOfBirth ||
        !p.gender ||
        !p.bloodType ||
        !p.city ||
        !p.address ||
        !p.emergencyContact ||
        !p.emergencyPhone ||
        !p.jerseySize ||
        !p.idCardUrl
      ) {
        toast.error(`Mohon lengkapi semua data untuk Peserta ${i + 1}`);
        return false;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(p.email)) {
        toast.error(`Email tidak valid untuk Peserta ${i + 1}`);
        return false;
      }
    }

    if (!agreedToTerms) {
      toast.error("Mohon setujui syarat dan ketentuan");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("Silakan login terlebih dahulu");
      router.push("/api/auth/signin");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // First, validate the voucher code
      const voucherResponse = await fetch("/api/vouchers/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: redeemCode.trim() }),
      });

      const voucherData: RedeemCodeResponse = await voucherResponse.json();

      if (!voucherData.success) {
        toast.error(voucherData.message || "Kode voucher tidak valid");
        setIsSubmitting(false);
        return;
      }

      if (!voucherData.category) {
        toast.error("Kategori lomba tidak ditemukan pada voucher");
        setIsSubmitting(false);
        return;
      }

      // Submit each participant
      for (const participant of participants) {
        const registrationData = {
          userId: session.user.id,
          fullName: participant.fullName,
          email: participant.email,
          phoneNumber: participant.phoneNumber,
          dateOfBirth: new Date(participant.dateOfBirth),
          gender: participant.gender,
          bloodType: participant.bloodType,
          city: participant.city,
          address: participant.address,
          emergencyContact: participant.emergencyContact,
          emergencyPhone: participant.emergencyPhone,
          category: voucherData.category as RegistrationCategory,
          jerseySize: participant.jerseySize,
          medicalCondition: participant.medicalCondition || undefined,
          idCardUrl: participant.idCardUrl,
          idCardPublicId: participant.idCardPublicId,
          type: "regular" as "super_early_bird" | "early_bird" | "regular",
          voucherCode: redeemCode,
        };

        const result = await createRegistration(registrationData);

        if (!result.success) {
          toast.error(result.error || "Gagal mendaftarkan peserta");
          setIsSubmitting(false);
          return;
        }
      }

      toast.success("Pendaftaran berhasil! Silakan tunggu konfirmasi.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Terjadi kesalahan saat mendaftar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      {/* Redeem Code Input Section */}
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Kode Voucher</h2>
        <p className="text-gray-600 mb-4">
          Masukkan kode voucher yang Anda miliki untuk mendapatkan pendaftaran gratis.
        </p>
        <input
          type="text"
          value={redeemCode}
          onChange={(e) => setRedeemCode(e.target.value)}
          placeholder="Masukkan kode voucher..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4BCFFC] focus:outline-none text-background uppercase placeholder-gray-400"
        />
        <p className="text-sm text-gray-500 mt-2">
          * Kode voucher akan divalidasi saat Anda submit pendaftaran
        </p>
      </div>

      {/* Participant Form */}
      <div className="">
        <ParticipantForm
          index={0}
          data={participants[0]}
          onChange={(data) => updateParticipant(0, data)}
          isBundling={false}
        />
      </div>

      {/* Price Summary */}
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Ringkasan Pembayaran</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>1 Peserta (Voucher)</span>
            <span className="text-green-600 font-medium">GRATIS</span>
          </div>

          {/* Jersey Extras */}
          {participants.map((p, i) => {
            if (p.jerseySize === "XL" || p.jerseySize === "XXL") {
              const extra = p.jerseySize === "XL" ? JERSEY_XL_EXTRA : JERSEY_XXL_EXTRA;
              return (
                <div key={i} className="flex justify-between text-gray-600">
                  <span>Peserta {i + 1} - Jersey {p.jerseySize}</span>
                  <span>+{formatCurrency(extra)}</span>
                </div>
              );
            }
            return null;
          })}

          <div className="border-t-2 border-gray-200 pt-3 mt-3">
            <div className="flex justify-between text-xl font-bold text-background">
              <span>Total</span>
              <span>{calculateTotal() === 0 ? "GRATIS" : formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Proof Upload - Only show if there are jersey extras */}
      {calculateTotal() > 0 && (
        <>
          <div className="bg-amber-50 border-4 border-amber-400 p-6">
            <h2 className="text-2xl font-impact text-background mb-4">Informasi Pembayaran Tambahan</h2>
            <div className="space-y-3 text-gray-700">
              <p className="text-sm">
                Anda perlu membayar biaya tambahan untuk ukuran jersey XL/XXL.
              </p>
              <p className="font-bold text-lg">Transfer ke:</p>
              <div className="bg-white p-4 space-y-2">
                <p><span className="font-medium">Bank:</span> BCA</p>
                <p><span className="font-medium">No. Rekening:</span> 1234567890</p>
                <p><span className="font-medium">Atas Nama:</span> ENTHUSIAST RUN 2025</p>
              </div>
              <div className="bg-white p-4">
                <p className="font-medium">Berita Transfer:</p>
                <p className="text-[#4BCFFC] font-mono font-bold text-lg mt-1">
                  ER2025-VOUCHER-{session?.user?.name?.split(" ")[0]?.toUpperCase() || "NAMA"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-impact text-background mb-4">Upload Bukti Pembayaran</h2>
            <UploadWidget
              folder="enthusiast-run/payment-proofs"
              allowedFormats={["jpg", "jpeg", "png", "pdf"]}
              label=""
              onUploadSuccess={(url, publicId) => {
                console.log("Payment proof uploaded:", url, publicId);
              }}
            />
          </div>
        </>
      )}

      {/* Terms and Submit */}
      <div className="bg-white p-6 shadow-lg rounded-b-xl">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-[#4BCFFC] focus:ring-[#4BCFFC]"
          />
          <span className="text-gray-600">
            Saya menyetujui{" "}
            <a href="/terms" className="text-[#4BCFFC] hover:underline">
              syarat dan ketentuan
            </a>{" "}
            yang berlaku untuk Enthusiast Run 2025
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-6 py-4 rounded-xl font-impact text-xl text-white transition-all ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#4BCFFC] hover:bg-[#3AA9D1]"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Memvalidasi & Mendaftar...
            </span>
          ) : calculateTotal() === 0 ? (
            "REDEEM & DAFTAR SEKARANG - GRATIS"
          ) : (
            `REDEEM & DAFTAR SEKARANG - ${formatCurrency(calculateTotal())}`
          )}
        </button>
      </div>
    </form>
  );
}