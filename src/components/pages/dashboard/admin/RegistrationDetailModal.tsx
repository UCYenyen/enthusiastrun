"use client";

import React from "react";
import Image from "next/image";
import { Registration } from "@/types/registration.md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RegistrationDetailModalProps {
  registration: Registration | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationDetailModal({
  registration,
  isOpen,
  onClose,
}: RegistrationDetailModalProps) {
  if (!registration) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const DetailRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-background text-right font-medium">{value}</span>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-impact text-background">
            Detail Registrasi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Info */}
          <div>
            <div className="font-bold text-background mb-2 flex items-center gap-2">
              <h3 className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">1</h3>
              <h1 className="text-white">PERSONAL DATAS</h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow label="Full Name" value={registration.fullName} />
              <DetailRow label="Email" value={registration.email} />
              <DetailRow label="Phone" value={registration.phoneNumber} />
              <DetailRow label="Account Holder Name" value={registration.rekeningName} />
              <DetailRow label="Date of Birth" value={formatDate(registration.dateOfBirth)} />
              <DetailRow label="Gender" value={registration.gender} />
              <DetailRow label="Blood Type" value={registration.bloodType || "-"} />
              <DetailRow label="City" value={registration.city} />
              <DetailRow label="Address"  value={registration.address} />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <div className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">2</span>
               <h1 className="text-white">Emergency Contact</h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow label="Name" value={registration.emergencyContact} />
              <DetailRow label="Phone" value={registration.emergencyPhone} />
            </div>
          </div>

          {/* Event Info */}
          <div>
            <div className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">3</span>
               <h1 className="text-white">CATEGORY</h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow
                label="Category"
                value={
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    registration.category === "CATEGORY_5K" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-purple-100 text-purple-800"
                  }`}>
                    {registration.category === "CATEGORY_5K" ? "5K Run" : "10K Run"}
                  </span>
                }
              />
              <DetailRow label="Jersey Size" value={registration.jerseySize} />
              <DetailRow label="Medical Condition" value={registration.medicalCondition || "-"} />
            </div>
          </div>

          {/* Documents - ID Card */}
          <div>
            <div className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">4</span>
              <h1 className="text-white">ID CARD</h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              {registration.idCardUrl ? (
                <div className="space-y-3">
                  <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={registration.idCardUrl}
                      alt="KTP"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <a
                    href={registration.idCardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4BCFFC] hover:underline text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in new tab
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Not uploaded ID Card</p>
              )}
            </div>
          </div>

          {/* Payment Proof */}
          <div>
            <div className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">5</span>
              <h1 className="text-white">PAYMENT PROOF</h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              {registration.paymentProofUrl ? (
                <div className="space-y-3">
                  <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={registration.paymentProofUrl}
                      alt="Bukti Pembayaran"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <a
                    href={registration.paymentProofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4BCFFC] hover:underline text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in new tab
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Not uploaded payment proof</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">6</span>
               <h1 className="text-white">STATUS</h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow
                label="Status Registrasi"
                value={
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      registration.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : registration.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {registration.status === "confirmed" ? "Confirmed" : 
                     registration.status === "cancelled" ? "Cancelled" : "Pending"}
                  </span>
                }
              />
              <DetailRow
                label="Status Pembayaran"
                value={
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    registration.paymentStatus 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {registration.paymentStatus ? "Paid" : "Unpaid"}
                  </span>
                }
              />
              <DetailRow label="Registration Date" value={formatDate(registration.createdAt)} />
              {registration.paymentDate && (
                <DetailRow label="Payment Date" value={formatDate(registration.paymentDate)} />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}