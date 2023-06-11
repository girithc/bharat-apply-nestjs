/*
  Warnings:

  - The `classTwelvePassingYear` column on the `grades` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "grades" DROP COLUMN "classTwelvePassingYear",
ADD COLUMN     "classTwelvePassingYear" INTEGER;
