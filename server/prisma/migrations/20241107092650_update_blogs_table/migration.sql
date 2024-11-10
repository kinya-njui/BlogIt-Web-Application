/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "createdAt",
ADD COLUMN     "createedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
