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

const PERSONAL_PRICE = 150000;
const BUNDLING_TOTAL_PARTICIPANTS = 11;
const BUNDLING_PRICE = PERSONAL_PRICE * 10; // 10 tiket, 1 gratis
const JERSEY_XL_EXTRA = 10000;
const JERSEY_XXL_EXTRA = 15000;

interface RegistrationFormProps {
  category: "CATEGORY_5K" | "CATEGORY_10K";
  type: "super_early_bird" | "early_bird" | "regular";
}

export default function RegistrationForm({ category, type }: RegistrationFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [packageType, setPackageType] = useState<"personal" | "bundling">("personal");
  const [participantCount, setParticipantCount] = useState(1);
  const [participants, setParticipants] = useState<ParticipantData[]>([{ ...emptyParticipant }]);
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  const [paymentProofId, setPaymentProofId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Update participants array when package type or count changes
  useEffect(() => {
    if (packageType === "bundling") {
      const newParticipants = Array(BUNDLING_TOTAL_PARTICIPANTS)
        .fill(null)
        .map((_, i) => participants[i] || { ...emptyParticipant });
      setParticipants(newParticipants);
    } else {
      const newParticipants = Array(participantCount)
        .fill(null)
        .map((_, i) => participants[i] || { ...emptyParticipant });
      setParticipants(newParticipants);
    }
  }, [packageType, participantCount]);

  // Calculate total price
  const calculateTotal = () => {
    let basePrice = 0;
    
    if (packageType === "bundling") {
      basePrice = BUNDLING_PRICE;
    } else {
      basePrice = participantCount * PERSONAL_PRICE;
    }

    // Add jersey size extras
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

    if (!paymentProofUrl) {
      toast.error("Mohon upload bukti pembayaran");
      return false;
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
          category: (category === "CATEGORY_5K" ? "CATEGORY_5K" : "CATEGORY_10K") as RegistrationCategory,
          type: type,
          jerseySize: participant.jerseySize,
          medicalCondition: participant.medicalCondition || undefined,
          idCardUrl: participant.idCardUrl,
          idCardPublicId: participant.idCardPublicId,
          paymentProofUrl: paymentProofUrl,
          paymentProofId: paymentProofId,
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
      {/* Package Selection */}
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Pilih Paket</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPackageType("personal")}
            className={`p-6 rounded-xl border-4 transition-all ${
              packageType === "personal"
                ? "border-[#4BCFFC] bg-[#4BCFFC]/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <h3 className="text-xl font-impact text-background">Personal</h3>
            <p className="text-gray-600 mt-2">1-9 Peserta</p>
            <p className="text-2xl font-bold text-background mt-2">
              {formatCurrency(PERSONAL_PRICE)}/orang
            </p>
          </button>

          <button
            type="button"
            onClick={() => setPackageType("bundling")}
            className={`p-6 rounded-xl border-4 transition-all ${
              packageType === "bundling"
                ? "border-[#4BCFFC] bg-[#4BCFFC]/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <h3 className="text-xl font-impact text-background">Bundling</h3>
            <p className="text-gray-600 mt-2">Beli 10 Gratis 1!</p>
            <p className="text-2xl font-bold text-background mt-2">
              {formatCurrency(BUNDLING_PRICE)}
            </p>
            <p className="text-sm text-green-600 mt-1">Hemat {formatCurrency(PERSONAL_PRICE)}!</p>
          </button>
        </div>

        {/* Participant Count for Personal */}
        {packageType === "personal" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah Peserta
            </label>
            <select
              value={participantCount}
              onChange={(e) => setParticipantCount(Number(e.target.value))}
              className="w-full md:w-48 px-4 py-2 border-2 rounded-lg border-gray-200 focus:border-[#4BCFFC] focus:outline-none text-background"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  {num} Peserta
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Participant Forms */}
      <div className="">
        {participants.map((participant, index) => (
          <ParticipantForm
            key={index}
            index={index}
            data={participant}
            onChange={(data) => updateParticipant(index, data)}
            isBundling={packageType === "bundling"}
          />
        ))}
      </div>

      {/* Price Summary */}
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Ringkasan Pembayaran</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>
              {packageType === "bundling"
                ? "Paket Bundling (10+1)"
                : `${participantCount} Peserta x ${formatCurrency(PERSONAL_PRICE)}`}
            </span>
            <span>
              {packageType === "bundling"
                ? formatCurrency(BUNDLING_PRICE)
                : formatCurrency(participantCount * PERSONAL_PRICE)}
            </span>
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
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-amber-50 border-4 border-amber-400 p-6">
        <h2 className="text-2xl font-impact text-background mb-4">Informasi Pembayaran</h2>
        <div className="space-y-3 text-gray-700">
          <p className="font-bold text-lg">Transfer ke:</p>
          <div className="bg-white p-4 space-y-2">
            <p><span className="font-medium">Bank:</span> BCA</p>
            <p><span className="font-medium">No. Rekening:</span> 1234567890</p>
            <p><span className="font-medium">Atas Nama:</span> ENTHUSIAST RUN 2025</p>
          </div>
          <div className="bg-white p-4">
            <p className="font-medium">Berita Transfer:</p>
            <p className="text-[#4BCFFC] font-mono font-bold text-lg mt-1">
              ER2025-{category.toUpperCase()}-{session?.user?.name?.split(" ")[0]?.toUpperCase() || "NAMA"}
            </p>
          </div>
          <p className="text-sm text-amber-700">
            * Pastikan nominal transfer sesuai dengan total pembayaran
          </p>
        </div>
      </div>

      {/* Payment Proof Upload */}
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Upload Bukti Pembayaran</h2>
        {paymentProofUrl ? (
          <div className="flex items-center gap-4 p-4 bg-green-50 border-2 border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-green-700">Bukti pembayaran berhasil diupload</p>
              <button
                type="button"
                onClick={() => {
                  setPaymentProofUrl("");
                  setPaymentProofId("");
                }}
                className="text-sm text-red-500 hover:underline mt-1"
              >
                Hapus dan upload ulang
              </button>
            </div>
          </div>
        ) : (
          <UploadWidget
            folder="enthusiast-run/payment-proofs"
            allowedFormats={["jpg", "jpeg", "png", "pdf"]}
            label=""
            onUploadSuccess={(url, publicId) => {
              setPaymentProofUrl(url);
              setPaymentProofId(publicId || "");
            }}
          />
        )}
      </div>

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
              Memproses...
            </span>
          ) : (
            `DAFTAR SEKARANG - ${formatCurrency(calculateTotal())}`
          )}
        </button>
      </div>
    </form>
  );
}