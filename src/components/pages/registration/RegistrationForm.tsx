"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ParticipantForm from "./ParticipantForm";
import { UploadWidget } from "@/components/CloudinaryWidget";
import { createRegistration } from "@/lib/registration";
import { RegistrationCategory } from "@/types/registration.md";
import Image from "next/image";

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
  jerseySize: "S",
  medicalCondition: "",
  idCardUrl: "",
  idCardPublicId: "",
};

const BUNDLING_TOTAL_PARTICIPANTS = 11;
const JERSEY_XXL_EXTRA = 10000;
const JERSEY_XXXL_EXTRA = 15000;

interface RegistrationFormProps {
  category: "CATEGORY_5K" | "CATEGORY_10K";
  type: "super_early_bird" | "early_bird" | "regular";
}

export default function RegistrationForm({ category, type }: RegistrationFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [packageType, setPackageType] = useState<"personal" | "bundling" | "uc_student">("personal");
  const [participantCount, setParticipantCount] = useState(1);
  const [participants, setParticipants] = useState<ParticipantData[]>([{ ...emptyParticipant }]);
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  const [paymentProofId, setPaymentProofId] = useState("");
  const [rekeningName, setRekeningName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const is5K = category === "CATEGORY_5K";
  const isUCStudent = session?.user?.email?.endsWith("@student.ciputra.ac.id");
  const showUCSelection = isUCStudent && (type === "early_bird" || type === "regular");

  const getPrices = () => {
    if (type === "super_early_bird") {
      return { personal: is5K ? 149000 : 179000, uc: 0 };
    }
    if (type === "early_bird") {
      return { personal: is5K ? 229000 : 239000, uc: is5K ? 189000 : 199000 };
    }
    return { personal: is5K ? 249000 : 299000, uc: is5K ? 199000 : 199000 };
  };

  const prices = getPrices();
  const PERSONAL_PRICE = prices.personal;
  const UC_STUDENT_PRICE = prices.uc;
  const BUNDLING_PRICE = PERSONAL_PRICE * 10;

  useEffect(() => {
    if (packageType === "bundling") {
      const newParticipants = Array(BUNDLING_TOTAL_PARTICIPANTS)
        .fill(null)
        .map((_, i) => participants[i] || { ...emptyParticipant });
      setParticipants(newParticipants);
    } else if (packageType === "uc_student") {
      setParticipantCount(1);
      setParticipants([participants[0] || { ...emptyParticipant }]);
    } else {
      const newParticipants = Array(participantCount)
        .fill(null)
        .map((_, i) => participants[i] || { ...emptyParticipant });
      setParticipants(newParticipants);
    }
  }, [packageType, participantCount]);

  const calculateTotal = () => {
    let basePrice = 0;
    if (packageType === "bundling") {
      basePrice = BUNDLING_PRICE;
    } else if (packageType === "uc_student") {
      basePrice = UC_STUDENT_PRICE;
    } else {
      basePrice = participantCount * PERSONAL_PRICE;
    }

    const jerseyExtras = participants.reduce((total, p) => {
      if (p.jerseySize === "XXL") return total + JERSEY_XXL_EXTRA;
      if (p.jerseySize === "XXXL") return total + JERSEY_XXXL_EXTRA;
      return total;
    }, 0);

    return basePrice + jerseyExtras;
  };

  const totalPrice = calculateTotal();

  const updateParticipant = (index: number, data: Partial<ParticipantData>) => {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...data };
      return updated;
    });
  };

  const validateForm = () => {
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.fullName || !p.email || !p.phoneNumber || !p.dateOfBirth || !p.gender || !p.bloodType || !p.city || !p.address || !p.emergencyContact || !p.emergencyPhone || !p.jerseySize || !p.idCardUrl) {
        toast.error(`Please fill all the required data for participant ${i + 1}`);
        return false;
      }
    }
    if (totalPrice > 0) {
      if (!rekeningName.trim()) {
        toast.error("Please enter account holder name");
        return false;
      }
      if (!paymentProofUrl) {
        toast.error("Please upload payment proof");
        return false;
      }
    }
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("Please log in first");
      router.push("/api/auth/signin");
      return;
    }
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      for (const participant of participants) {
        const registrationData = {
          userId: session.user.id as string,
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
          category: category as RegistrationCategory,
          type: type,
          jerseySize: participant.jerseySize,
          medicalCondition: participant.medicalCondition || undefined,
          idCardUrl: participant.idCardUrl,
          idCardPublicId: participant.idCardPublicId,
          paymentProofUrl: totalPrice > 0 ? paymentProofUrl : undefined,
          paymentProofId: totalPrice > 0 ? paymentProofId : undefined,
          rekeningName: totalPrice > 0 ? rekeningName : "-",
        };
        const result = await createRegistration(registrationData);
        if (!result.success) {
          toast.error(result.error || "Failed to register");
          setIsSubmitting(false);
          return;
        }
      }
      toast.success("Registration successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Select Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setPackageType("personal")}
            className={`p-6 rounded-xl border-4 transition-all ${packageType === "personal" ? "border-[#4BCFFC] bg-[#4BCFFC]/10" : "border-gray-200"}`}
          >
            <h3 className="text-xl font-impact text-background">Personal</h3>
            <p className="text-xl font-bold text-background mt-2">{formatCurrency(PERSONAL_PRICE)}/person</p>
          </button>

          <button
            type="button"
            onClick={() => setPackageType("bundling")}
            className={`p-6 rounded-xl border-4 transition-all ${packageType === "bundling" ? "border-[#4BCFFC] bg-[#4BCFFC]/10" : "border-gray-200"}`}
          >
            <h3 className="text-xl font-impact text-background">Bundling</h3>
            <p className="text-gray-600 mt-2 text-sm">Buy 10 Get 1 Free!</p>
            <p className="text-xl font-bold text-background mt-2">{formatCurrency(BUNDLING_PRICE)}</p>
          </button>

          {showUCSelection && (
            <button
              type="button"
              onClick={() => setPackageType("uc_student")}
              className={`p-6 rounded-xl border-4 transition-all ${packageType === "uc_student" ? "border-[#4BCFFC] bg-[#4BCFFC]/10" : "border-gray-200"}`}
            >
              <h3 className="text-xl font-impact text-background">Mahasiswa UC</h3>
              <p className="text-gray-600 mt-2 text-sm">Special UC Rate</p>
              <p className="text-xl font-bold text-background mt-2">{formatCurrency(UC_STUDENT_PRICE)}</p>
            </button>
          )}
        </div>

        {packageType === "personal" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Participant Count</label>
            <select
              value={participantCount}
              onChange={(e) => setParticipantCount(Number(e.target.value))}
              className="w-full md:w-48 px-4 py-2 border-2 rounded-lg border-gray-200 text-background"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>{num} Peserta</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
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

      {totalPrice > 0 && (
        <div className="bg-white p-6 shadow-lg border-b-2 border-gray-100">
          <h2 className="text-2xl font-impact text-background mb-4">Payment Confirmation</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Account holder name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={rekeningName}
              onChange={(e) => setRekeningName(e.target.value)}
              placeholder="Enter account holder name"
              className="w-full px-4 py-3 border-2 rounded-lg border-gray-200 text-background focus:border-[#4BCFFC] outline-none transition-colors"
            />
          </div>
        </div>
      )}

      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>
              {packageType === "bundling"
                ? "Bundling Package (10+1)"
                : packageType === "uc_student"
                  ? "Mahasiswa UC Rate"
                  : `Paket Personal (${participantCount} Peserta)`}
            </span>
            <span>
              {formatCurrency(
                packageType === "bundling"
                  ? BUNDLING_PRICE
                  : packageType === "uc_student"
                    ? UC_STUDENT_PRICE
                    : participantCount * PERSONAL_PRICE
              )}
            </span>
          </div>

          {participants.some(p => p.jerseySize === "XXL" || p.jerseySize === "XXXL") && (
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-500 mt-2">Additional Charges (Jersey):</p>
              {participants.map((p, idx) => {
                if (p.jerseySize === "XXL" || p.jerseySize === "XXXL") {
                  const extra = p.jerseySize === "XXL" ? JERSEY_XXL_EXTRA : JERSEY_XXXL_EXTRA;
                  return (
                    <div key={idx} className="flex justify-between text-sm text-amber-600 pl-2">
                      <span>Peserta {idx + 1} ({p.fullName || "Nameless"}) - Size {p.jerseySize}</span>
                      <span>+{formatCurrency(extra)}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          <div className="border-t-2 border-gray-200 pt-3 mt-3">
            <div className="flex justify-between text-xl font-bold text-background">
              <span>Total Bayar</span>
              <span className="text-[#4BCFFC]">{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      {totalPrice > 0 && (
        <div className="bg-amber-50 border-4 border-amber-400 p-6">
          <h2 className="text-2xl font-impact text-background mb-4">Payment Information</h2>
          <div className="bg-white p-4 space-y-2 text-gray-700">
            <p><span className="font-medium">Bank:</span> BCA</p>
            <p><span className="font-medium">Account:</span> 0092872571</p>
            <p><span className="font-medium">Name:</span> Kho Valencia Febe Amanda</p>
             <p><span className="font-medium">Payment Description:</span> Run.Participant Name</p>
          </div>
        </div>
      )}

      {totalPrice > 0 && (
        <div className="bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-impact text-background mb-4">Upload Payment Proof</h2>
          {!paymentProofUrl ? (
            <UploadWidget
              folder="enthusiast-run/payment-proofs"
              allowedFormats={["jpg", "jpeg", "png", "pdf"]}
              label=""
              onUploadSuccess={(url, publicId) => {
                setPaymentProofUrl(url);
                setPaymentProofId(publicId || "");
              }}
            />
          ) : (
            <div className="p-4 bg-green-50 border-2 border-green-200 text-green-700">
              Payment proof uploaded. <button type="button" onClick={() => setPaymentProofUrl("")} className="text-red-500 underline">Change</button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white p-6 shadow-lg rounded-b-xl">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 w-5 h-5" />
          <span className="text-gray-600">I agree to the terms and conditions.</span>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-6 py-4 rounded-xl font-impact text-xl text-white ${isSubmitting ? "bg-gray-400" : "bg-[#4BCFFC] hover:bg-[#3AA9D1]"}`}
        >
          {isSubmitting ? "PROCESSING..." : `REGISTER NOW - ${formatCurrency(totalPrice)}`}
        </button>
      </div>
    </form>
  );
}