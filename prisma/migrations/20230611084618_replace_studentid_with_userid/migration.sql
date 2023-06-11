/*
  Warnings:

  - You are about to drop the column `studentId` on the `grades` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `grades` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_studentId_fkey";

-- DropIndex
DROP INDEX "grades_studentId_key";

-- AlterTable
ALTER TABLE "grades" DROP COLUMN "studentId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "grades_userId_key" ON "grades"("userId");

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
