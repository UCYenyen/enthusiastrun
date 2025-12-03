/*
  Warnings:

  - Added the required column `type` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('super_early_bird', 'early_bird', 'regular');

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "type" "RegistrationType" NOT NULL;
