"use client";

import React from "react";
import { UploadWidget } from "@/components/CloudinaryWidget";
import { ParticipantData } from "./RegistrationForm";

interface ParticipantFormProps {
  index: number;
  data: ParticipantData;
  onChange: (data: Partial<ParticipantData>) => void;
  isBundling: boolean;
}

const GENDER_OPTIONS = [
  { value: "Male", label: "Laki-laki" },
  { value: "Female", label: "Perempuan" },
];

const BLOOD_TYPE_OPTIONS = ["A", "B", "AB", "O"];

const JERSEY_SIZE_OPTIONS = [
  { value: "S", label: "S", extra: 0 },
  { value: "M", label: "M", extra: 0 },
  { value: "L", label: "L", extra: 0 },
  { value: "XL", label: "XL (+Rp 10.000)", extra: 10000 },
  { value: "XXL", label: "XXL (+Rp 15.000)", extra: 15000 },
];

export default function ParticipantForm({
  index,
  data,
  onChange,
  isBundling,
}: ParticipantFormProps) {
  const [isExpanded, setIsExpanded] = React.useState(index === 0);

  const inputClasses =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4BCFFC] focus:outline-none text-background placeholder-gray-400";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-white border-b-2 border-white shadow-lg overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-[#00476d] flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
            {index + 1}
          </span>
          <span className="text-white font-impact text-xl">
            {data.fullName || `Peserta ${index + 1}`}
            {isBundling && index === 10 && (
              <span className="ml-2 px-2 py-1 bg-green-400 text-green-900 text-xs rounded-full font-normal">
                GRATIS!
              </span>
            )}
          </span>
        </div>
        <svg
          className={`w-6 h-6 text-white transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Form Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Personal Info Section */}
          <div>
            <h3 className="text-lg font-bold text-background mb-4 pb-2 border-b-2 border-gray-100">
              Data Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className={labelClasses}>
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => onChange({ fullName: e.target.value })}
                  placeholder="Masukkan nama lengkap sesuai KTP"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClasses}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => onChange({ email: e.target.value })}
                  placeholder="email@example.com"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClasses}>
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={data.phoneNumber}
                  onChange={(e) => onChange({ phoneNumber: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className={labelClasses}>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={data.dateOfBirth}
                  onChange={(e) => onChange({ dateOfBirth: e.target.value })}
                  className={inputClasses}
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className={labelClasses}>
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.gender}
                  onChange={(e) => onChange({ gender: e.target.value })}
                  className={inputClasses}
                  required
                >
                  <option value="">Pilih jenis kelamin</option>
                  {GENDER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Type */}
              <div>
                <label className={labelClasses}>
                  Golongan Darah <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.bloodType}
                  onChange={(e) => onChange({ bloodType: e.target.value })}
                  className={inputClasses}
                  required
                >
                  <option value="">Pilih golongan darah</option>
                  {BLOOD_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className={labelClasses}>
                  Kota <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => onChange({ city: e.target.value })}
                  placeholder="Masukkan kota domisili"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className={labelClasses}>
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={data.address}
                  onChange={(e) => onChange({ address: e.target.value })}
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-background mb-4 pb-2 border-b-2 border-gray-100">
              Kontak Darurat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Emergency Contact Name */}
              <div>
                <label className={labelClasses}>
                  Nama Kontak Darurat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.emergencyContact}
                  onChange={(e) => onChange({ emergencyContact: e.target.value })}
                  placeholder="Nama orang yang dapat dihubungi"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Emergency Contact Phone */}
              <div>
                <label className={labelClasses}>
                  Nomor Kontak Darurat <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={data.emergencyPhone}
                  onChange={(e) => onChange({ emergencyPhone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </div>

          {/* Jersey & Medical Section */}
          <div>
            <h3 className="text-lg font-bold text-background mb-4 pb-2 border-b-2 border-gray-100">
              Jersey & Kondisi Medis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Jersey Size */}
              <div>
                <label className={labelClasses}>
                  Ukuran Jersey <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.jerseySize}
                  onChange={(e) => onChange({ jerseySize: e.target.value })}
                  className={inputClasses}
                  required
                >
                  <option value="">Pilih ukuran jersey</option>
                  {JERSEY_SIZE_OPTIONS.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
                {(data.jerseySize === "XL" || data.jerseySize === "XXL") && (
                  <p className="text-sm text-amber-600 mt-1">
                    * Ukuran {data.jerseySize} dikenakan biaya tambahan
                  </p>
                )}
              </div>

              {/* Medical Condition */}
              <div className="md:col-span-2">
                <label className={labelClasses}>
                  Kondisi Medis <span className="text-gray-400">(Opsional)</span>
                </label>
                <textarea
                  value={data.medicalCondition}
                  onChange={(e) => onChange({ medicalCondition: e.target.value })}
                  placeholder="Contoh: Alergi obat tertentu, asma, dll"
                  rows={2}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          {/* ID Card Upload Section */}
          <div>
            <h3 className="text-lg font-bold text-background mb-4 pb-2 border-b-2 border-gray-100">
              Upload KTP/Kartu Identitas
            </h3>
            {data.idCardUrl ? (
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-700">KTP berhasil diupload</p>
                  <button
                    type="button"
                    onClick={() => {
                      onChange({ idCardUrl: "", idCardPublicId: "" });
                    }}
                    className="text-sm text-red-500 hover:underline mt-1"
                  >
                    Hapus dan upload ulang
                  </button>
                </div>
              </div>
            ) : (
              <UploadWidget
                folder="enthusiast-run/id-cards"
                allowedFormats={["jpg", "jpeg", "png", "pdf"]}
                label=""
                onUploadSuccess={(url, publicId) => {
                  onChange({ idCardUrl: url, idCardPublicId: publicId || "" });
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}