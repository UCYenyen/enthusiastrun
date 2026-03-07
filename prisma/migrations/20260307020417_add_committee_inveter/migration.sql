-- AlterEnum
ALTER TYPE "ChosenPackage" ADD VALUE 'only_medal';

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "committeeInviter" TEXT;
