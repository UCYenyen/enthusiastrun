"use client";

import React from "react";
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-impact text-background">
            Detail Registrasi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="font-bold text-background mb-2">Data Pribadi</h3>
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
            <h3 className="font-bold text-background mb-2">Kontak Darurat</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow label="Nama" value={registration.emergencyContact} />
              <DetailRow label="Telepon" value={registration.emergencyPhone} />
            </div>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="font-bold text-background mb-2">Info Lomba</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow
                label="Kategori"
                value={registration.category === "CATEGORY_5K" ? "5K Run" : "10K Run"}
              />
              <DetailRow label="Ukuran Jersey" value={registration.jerseySize} />
              <DetailRow label="Kondisi Medis" value={registration.medicalCondition || "-"} />
              <DetailRow label="BIB Number" value={registration.bibNumber || "Belum ditetapkan"} />
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-bold text-background mb-2">Dokumen</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              {registration.idCardUrl && (
                <div>
                  <p className="text-gray-500 text-sm mb-2">KTP/Kartu Identitas:</p>
                  <a
                    href={registration.idCardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4BCFFC] hover:underline"
                  >
                    Lihat Dokumen
                  </a>
                </div>
              )}
              {registration.paymentProofUrl && (
                <div>
                  <p className="text-gray-500 text-sm mb-2">Bukti Pembayaran:</p>
                  <a
                    href={registration.paymentProofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4BCFFC] hover:underline"
                  >
                    Lihat Bukti
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-bold text-background mb-2">Status</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailRow
                label="Status Registrasi"
                value={
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      registration.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : registration.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {registration.status}
                  </span>
                }
              />
              <DetailRow
                label="Status Pembayaran"
                value={registration.paymentStatus ? "Lunas" : "Belum Lunas"}
              />
              <DetailRow label="Tanggal Daftar" value={formatDate(registration.createdAt)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}