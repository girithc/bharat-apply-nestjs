/*
  Warnings:

  - You are about to drop the column `applicationId` on the `queries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "queries" DROP CONSTRAINT "queries_applicationId_fkey";

-- AlterTable
ALTER TABLE "queries" DROP COLUMN "applicationId";
