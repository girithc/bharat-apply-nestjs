/*
  Warnings:

  - You are about to drop the column `college` on the `applicationprofiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applicationprofiles" DROP COLUMN "college",
ADD COLUMN     "collegesAdded" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "collegesApplied" TEXT[] DEFAULT ARRAY['']::TEXT[];
