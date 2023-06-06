-- CreateTable
CREATE TABLE "ApplicationProfile" (
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

    CONSTRAINT "ApplicationProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationProfile_userId_key" ON "ApplicationProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "grades_studentId_key" ON "grades"("studentId");

-- AddForeignKey
ALTER TABLE "ApplicationProfile" ADD CONSTRAINT "ApplicationProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "ApplicationProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
