/*
  Warnings:

  - You are about to drop the column `compressedSize` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `originalSize` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Video` table. All the data in the column will be lost.
  - Added the required column `url` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "compressedSize",
DROP COLUMN "duration",
DROP COLUMN "originalSize",
DROP COLUMN "publicId",
DROP COLUMN "updatedAt",
ADD COLUMN     "url" TEXT NOT NULL;
