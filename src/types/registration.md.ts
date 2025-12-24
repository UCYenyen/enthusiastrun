export type RegistrationCategory = "CATEGORY_5K" | "CATEGORY_10K";
export type RegistrationStatus = "pending" | "confirmed" | "cancelled";
export type Gender = "Male" | "Female";
export type BloodType = "A" | "B" | "AB" | "O";
export type JerseySize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender | "";
  address: string;
  city: string;
  emergencyContact: string;
  emergencyPhone: string;
  category: RegistrationCategory | "";
  bloodType?: BloodType | "";
  medicalCondition?: string;
  jerseySize: JerseySize | "";
}

export interface RegistrationPhotos {
  photoUrl: string;
  photoPublicId: string;
  idCardUrl: string;
  idCardPublicId: string;
  paymentProofUrl: string;
  paymentProofId: string;
}

export interface RegistrationData {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  city: string;
  emergencyContact: string;
  emergencyPhone: string;
  category: RegistrationCategory;
  bloodType?: string;
  medicalCondition?: string;
  photoUrl?: string;
  photoPublicId?: string;
  idCardUrl?: string;
  idCardPublicId?: string;
  jerseySize: string;
  paymentProofUrl?: string;
  paymentProofId?: string;
  rekeningName?: string;
  type: "super_early_bird" | "early_bird" | "regular" | "redeem_voucher";
}

export interface Voucher {
  id: string;
  category: RegistrationCategory;
  isUsed: boolean;
}

export interface Registration extends RegistrationData {
  id: string;
  status: RegistrationStatus;
  paymentStatus: boolean;
  paymentDate?: Date | null;
  createdAt: Date;
  qrCodeClaimed?: boolean | null;
  qrCodeClaimedAt?: Date | null;
  updatedAt: Date;
  user?: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  qrCode?:{
    qrCodeId: string;
    qrCodeUrl: string;
  }
}

export interface BundlingParticipant {
  fullName: string;
  email: string;
  bloodType: string;
  ktp: string;
  gender: "Laki-laki" | "Perempuan";
  birthDate: string;
  phone: string;
  emergencyPhone: string;
  participantStatus: "Mahasiswa" | "Umum";
  jerseySize: JerseySize;
}

export interface BundlingRegistrationData {
  participants: BundlingParticipant[];
  paymentProofUrl?: string;
}