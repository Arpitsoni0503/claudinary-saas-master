/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `page` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "originalSize" TEXT,
ADD COLUMN     "page" TEXT NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Video_publicId_key" ON "Video"("publicId");
