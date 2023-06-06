/*
  Warnings:

  - You are about to drop the `ApplicationProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationProfile" DROP CONSTRAINT "ApplicationProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_studentId_fkey";

-- DropTable
DROP TABLE "ApplicationProfile";

-- CreateTable
CREATE TABLE "applicationprofiles" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "bloodGroup" TEXT,
    "primaryPhone" INTEGER,
    "secondaryPhone" INTEGER,
    "email" TEXT,
    "agreeToCommunicationsContact" BOOLEAN,
    "idProof" TEXT[],
    "idProofLinks" TEXT[],
    "addressLineOne" TEXT,
    "addressLineTwo" TEXT,
    "state" TEXT,
    "city" TEXT,
    "country" TEXT,
    "pinCode" INTEGER,
    "agreeToCommunicationsAddress" BOOLEAN,
    "fathersTitle" TEXT,
    "fathersFirstName" TEXT,
    "fathersLastName" TEXT,
    "fathersDateOfBirth" TIMESTAMP(3),
    "mothersTitle" TEXT,
    "mothersFirstName" TEXT,
    "mothersLastName" TEXT,
    "mothersDateOfBirth" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "applicationprofiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applicationprofiles_userId_key" ON "applicationprofiles"("userId");

-- AddForeignKey
ALTER TABLE "applicationprofiles" ADD CONSTRAINT "applicationprofiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "applicationprofiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
