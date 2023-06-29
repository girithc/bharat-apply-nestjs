/*
  Warnings:

  - Added the required column `admissionEndDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admissionStartDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "admissionEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "admissionStartDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
