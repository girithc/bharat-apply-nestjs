/*
  Warnings:

  - You are about to drop the column `collegesAdded` on the `applicationprofiles` table. All the data in the column will be lost.
  - You are about to drop the column `collegesApplied` on the `applicationprofiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applicationprofiles" DROP COLUMN "collegesAdded",
DROP COLUMN "collegesApplied";
