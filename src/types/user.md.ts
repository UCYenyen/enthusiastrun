import { Role } from "@prisma/client";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified?: Date | null;
  image: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  name: string | null;
  email: string | null;
  emailVerified?: Date | null;
  image: string | null;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}