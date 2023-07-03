/*
  Warnings:

  - The `collegesAdded` column on the `applicationprofiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `collegesApplied` column on the `applicationprofiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "applicationprofiles" DROP COLUMN "collegesAdded",
ADD COLUMN     "collegesAdded" TEXT[],
DROP COLUMN "collegesApplied",
ADD COLUMN     "collegesApplied" TEXT[];
