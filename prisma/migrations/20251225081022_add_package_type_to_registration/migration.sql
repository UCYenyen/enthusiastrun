-- CreateEnum
CREATE TYPE "ChosenPackage" AS ENUM ('personal', 'bundling', 'ucstudent');

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "chosenPackage" "ChosenPackage" NOT NULL DEFAULT 'personal';
