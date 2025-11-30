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
      <span className="text-background font-medium">{value}</span>
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
            <h3 className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">1</span>
              <h1 className="text-white">DATA PRIBADI</h1>
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow label="Nama Lengkap" value={registration.fullName} />
              <DetailRow label="Email" value={registration.email} />
              <DetailRow label="Telepon" value={registration.phoneNumber} />
              <DetailRow label="Tanggal Lahir" value={formatDate(registration.dateOfBirth)} />
              <DetailRow label="Jenis Kelamin" value={registration.gender} />
              <DetailRow label="Golongan Darah" value={registration.bloodType || "-"} />
              <DetailRow label="Kota" value={registration.city} />
              <DetailRow label="Alamat" value={registration.address} />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">2</span>
               <h1 className="text-white">Kontak Darurat</h1>
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow label="Nama" value={registration.emergencyContact} />
              <DetailRow label="Telepon" value={registration.emergencyPhone} />
            </div>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">3</span>
               <h1 className="text-white">KATEGORI</h1>
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow
                label="Kategori"
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
              <DetailRow label="Ukuran Jersey" value={registration.jerseySize} />
              <DetailRow label="Kondisi Medis" value={registration.medicalCondition || "-"} />
            </div>
          </div>

          {/* Documents - ID Card */}
          <div>
            <h3 className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">4</span>
              <h1 className="text-white">KARTU IDENTITAS</h1>
            </h3>
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
                    Buka di tab baru
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Belum upload KTP</p>
              )}
            </div>
          </div>

          {/* Payment Proof */}
          <div>
            <h3 className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">5</span>
              <h1 className="text-white">BUKTI PEMBAYARAN</h1>
            </h3>
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
                    Buka di tab baru
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Belum upload bukti pembayaran</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-bold text-background mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#4BCFFC] rounded-full flex items-center justify-center text-white text-xs">6</span>
               <h1 className="text-white">STATUS</h1>
            </h3>
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
                    {registration.status === "confirmed" ? "Terkonfirmasi" : 
                     registration.status === "cancelled" ? "Dibatalkan" : "Menunggu"}
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
                    {registration.paymentStatus ? "Lunas" : "Belum Lunas"}
                  </span>
                }
              />
              <DetailRow label="Tanggal Daftar" value={formatDate(registration.createdAt)} />
              {registration.paymentDate && (
                <DetailRow label="Tanggal Pembayaran" value={formatDate(registration.paymentDate)} />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}