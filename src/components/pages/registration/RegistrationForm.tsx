"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ParticipantForm from "./ParticipantForm";
import { UploadWidget } from "@/components/CloudinaryWidget";
import { createBulkRegistration } from "@/lib/registration";
import { RegistrationCategory, ChosenPackage } from "@/types/registration.md";
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
  mahasiswaUCEnabled?: boolean;
}

export default function RegistrationForm({
  category,
  type,
  mahasiswaUCEnabled = false,
}: RegistrationFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [packageType, setPackageType] = useState<ChosenPackage>("personal");
  const [participantCount, setParticipantCount] = useState(1);
  const [participants, setParticipants] = useState<ParticipantData[]>([
    { ...emptyParticipant },
  ]);
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  const [paymentProofId, setPaymentProofId] = useState("");
  const [rekeningName, setRekeningName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const is5K = category === "CATEGORY_5K";
  const prices =
    type === "super_early_bird"
      ? { personal: is5K ? 149000 : 179000, uc: 0 }
      : type === "early_bird"
        ? { personal: is5K ? 185000 : 210000, uc: is5K ? 155000 : 185000 }
        : { personal: is5K ? 220000 : 245000, uc: is5K ? 199000 : 199000 };

  const PERSONAL_PRICE = prices.personal;
  const UC_STUDENT_PRICE = prices.uc;
  const BUNDLING_PRICE = PERSONAL_PRICE * 10;

  useEffect(() => {
    if (packageType === "bundling") {
      setParticipants(
        Array(BUNDLING_TOTAL_PARTICIPANTS)
          .fill(null)
          .map((_, i) => participants[i] || { ...emptyParticipant }),
      );
    } else if (packageType === "ucstudent") {
      setParticipantCount(1);
      setParticipants([participants[0] || { ...emptyParticipant }]);
    } else {
      setParticipants(
        Array(participantCount)
          .fill(null)
          .map((_, i) => participants[i] || { ...emptyParticipant }),
      );
    }
  }, [packageType, participantCount]);

  const totalPrice = (() => {
    let base =
      packageType === "bundling"
        ? BUNDLING_PRICE
        : packageType === "ucstudent"
          ? UC_STUDENT_PRICE
          : participantCount * PERSONAL_PRICE;
    const extra = participants.reduce(
      (acc, p) =>
        acc +
        (p.jerseySize === "XXL"
          ? JERSEY_XXL_EXTRA
          : p.jerseySize === "XXXL"
            ? JERSEY_XXXL_EXTRA
            : 0),
      0,
    );
    return base + extra;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return toast.error("Please login first");
    if (totalPrice > 0 && (!paymentProofUrl || !rekeningName))
      return toast.error("Upload payment proof");

    // Check for missing ID cards
    for (let i = 0; i < participants.length; i++) {
      if (!participants[i].idCardUrl) {
        return toast.error(`Please upload ID card for participant ${i + 1}`);
      }
    }

    setIsSubmitting(true);
    try {
      const dataList = participants.map((p) => ({
        userId: session.user.id as string,
        ...p,
        dateOfBirth: new Date(p.dateOfBirth),
        category: category as RegistrationCategory,
        type: type,
        paymentProofUrl: totalPrice > 0 ? paymentProofUrl : undefined,
        paymentProofId: totalPrice > 0 ? paymentProofId : undefined,
        rekeningName: rekeningName || "-",
        chosenPackage: packageType,
      }));

      const result = await createBulkRegistration(dataList);
      if (!result.success) throw new Error(result.error);

      toast.success("Registration successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">
          Select Package
        </h2>
        <div
          className={`grid gap-4 ${mahasiswaUCEnabled && type === "early_bird" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}
        >
          <button
            type="button"
            onClick={() => setPackageType("personal")}
            className={`p-6 rounded-xl border-4 ${packageType === "personal" ? "border-[#4BCFFC] bg-[#4BCFFC]/10" : "border-gray-200"}`}
          >
            <h3 className="text-xl font-impact text-background">Personal</h3>
            <p className="text-xl font-bold text-background mt-2">
              {formatCurrency(PERSONAL_PRICE)}/person
            </p>
          </button>
          <button
            type="button"
            onClick={() => setPackageType("bundling")}
            className={`p-6 rounded-xl border-4 ${packageType === "bundling" ? "border-[#4BCFFC] bg-[#4BCFFC]/10" : "border-gray-200"}`}
          >
            <h3 className="text-xl font-impact text-background">Bundling</h3>
            <p className="text-gray-600 mt-2 text-sm">Buy 10 Get 1 Free!</p>
            <p className="text-xl font-bold text-background mt-2">
              {formatCurrency(BUNDLING_PRICE)}
            </p>
          </button>
          {mahasiswaUCEnabled && type === "early_bird" && (
            <button
              type="button"
              onClick={() => setPackageType("ucstudent")}
              className={`p-6 rounded-xl border-4 ${packageType === "ucstudent" ? "border-[#4BCFFC] bg-[#4BCFFC]/10" : "border-gray-200"}`}
            >
              <h3 className="text-xl font-impact text-background">
                UC Student
              </h3>
              <p className="text-xl font-bold text-background mt-2">
                {formatCurrency(UC_STUDENT_PRICE)}/person
              </p>
            </button>
          )}
        </div>
        {packageType === "personal" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participant Count
            </label>
            <select
              value={participantCount}
              onChange={(e) => setParticipantCount(Number(e.target.value))}
              className="w-full md:w-48 px-4 py-2 border-2 rounded-lg border-gray-200 text-background"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  {n} Participant
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        {participants.map((p, i) => (
          <ParticipantForm
            key={i}
            index={i}
            data={p}
            isUcStudent={packageType === "ucstudent"}
            onChange={(d) =>
              setParticipants((prev) => {
                const upd = [...prev];
                upd[i] = { ...upd[i], ...d };
                return upd;
              })
            }
            isBundling={packageType === "bundling"}
          />
        ))}
      </div>

      {totalPrice > 0 && (
        <div className="bg-amber-50 border-4 border-amber-400 p-6">
          <h2 className="text-2xl font-impact text-background mb-4">
            Payment Information
          </h2>
          <div className="bg-white p-4 space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Bank:</span> BCA
            </p>
            <p>
              <span className="font-medium">Account:</span> 0092872571
            </p>
            <p>
              <span className="font-medium">Name:</span> Kho Valencia Febe
              Amanda
            </p>
            <p>
              <span className="font-medium">Payment Description:</span>{" "}
              Run.Participant Name
            </p>
          </div>
        </div>
      )}

      {totalPrice > 0 && (
        <div className="bg-white p-6 shadow-lg border-b-2 border-gray-100">
          <h2 className="text-2xl font-impact text-background mb-4">
            Payment Confirmation
          </h2>
          <input
            type="text"
            required
            value={rekeningName}
            onChange={(e) => setRekeningName(e.target.value)}
            placeholder="Account holder name"
            className="w-full px-4 py-3 border-2 rounded-lg border-gray-200 text-background outline-none"
          />
        </div>
      )}

      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-impact text-background mb-4">Summary</h2>
        <div className="flex justify-between text-xl font-bold text-background">
          <span>Total Price</span>
          <span className="text-[#4BCFFC]">{formatCurrency(totalPrice)}</span>
        </div>
      </div>

      {totalPrice > 0 && (
        <div className="bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-impact text-background mb-4">
            Upload Payment Proof
          </h2>
          {!paymentProofUrl ? (
            <UploadWidget
              folder="enthusiast-run/payment-proofs"
              allowedFormats={["jpg", "png", "pdf"]}
              onUploadSuccess={(url, id) => {
                setPaymentProofUrl(url);
                setPaymentProofId(id || "");
              }}
              label=""
            />
          ) : (
            <div className="p-4 bg-green-50 text-green-700">
              Proof uploaded.{" "}
              <button
                type="button"
                onClick={() => setPaymentProofUrl("")}
                className="underline"
              >
                Change
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-b-lg p-4 ">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-6 py-4 rounded-xl font-impact text-xl text-white ${isSubmitting ? "bg-gray-400" : "bg-[#4BCFFC]"}`}
        >
          {isSubmitting
            ? "PROCESSING..."
            : `REGISTER NOW - ${formatCurrency(totalPrice)}`}
        </button>
      </div>
    </form>
  );
}
