/*
  Warnings:

  - You are about to drop the column `qrCodeUrl` on the `Registration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "qrCodeUrl",
ADD COLUMN     "qrCodeId" TEXT;

-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL,
    "qrCodeUrl" TEXT NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
