-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ChosenPackage" ADD VALUE 'community_package_20';
ALTER TYPE "ChosenPackage" ADD VALUE 'community_package_30';
ALTER TYPE "ChosenPackage" ADD VALUE 'community_package_40';
