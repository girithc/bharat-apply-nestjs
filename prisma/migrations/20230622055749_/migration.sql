-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "phone" INTEGER NOT NULL,
    "refreshToken" TEXT,
    "isCollege" BOOLEAN NOT NULL DEFAULT false,
    "position" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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
    "fathersDateOfBirth" TEXT,
    "mothersTitle" TEXT,
    "mothersFirstName" TEXT,
    "mothersLastName" TEXT,
    "mothersDateOfBirth" TEXT,
    "userId" INTEGER NOT NULL,
    "college" TEXT[] DEFAULT ARRAY['']::TEXT[],

    CONSTRAINT "applicationprofiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "classTenBoard" TEXT,
    "classTenExaminationState" TEXT,
    "classTenExaminationCity" TEXT,
    "classTenSchoolName" TEXT,
    "classTenEnrollmentNo" INTEGER,
    "classTenPassingMonth" TEXT,
    "classTenPassingYear" INTEGER,
    "classTenGradeType" TEXT,
    "classTenMarks" DOUBLE PRECISION,
    "classTenTotalMarks" DOUBLE PRECISION,
    "classTenPercentage" DOUBLE PRECISION,
    "classTenInfoAccurate" BOOLEAN DEFAULT false,
    "classTwelveType" TEXT,
    "classTwelveStatus" TEXT,
    "classTwelveBoard" TEXT,
    "classTwelveExaminationState" TEXT,
    "classTwelveExaminationCity" TEXT,
    "classTwelveStream" TEXT,
    "classTwelveSchoolName" TEXT,
    "classTwelveSpecialization" TEXT,
    "classTwelveEnrollmentNo" INTEGER DEFAULT 0,
    "classTwelvePassingMonth" TEXT,
    "classTwelvePassingYear" INTEGER,
    "classTwelveGradeType" TEXT,
    "classTwelveMarks" DOUBLE PRECISION,
    "classTwelveTotalMarks" DOUBLE PRECISION,
    "classTwelvePercentage" DOUBLE PRECISION,
    "classTwelveInfoAccurate" BOOLEAN DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" VARCHAR(4) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "userId" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApplicationToCollege" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "applicationprofiles_userId_key" ON "applicationprofiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "grades_userId_key" ON "grades"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "College_code_key" ON "College"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationToCollege_AB_unique" ON "_ApplicationToCollege"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationToCollege_B_index" ON "_ApplicationToCollege"("B");

-- AddForeignKey
ALTER TABLE "applicationprofiles" ADD CONSTRAINT "applicationprofiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "College" ADD CONSTRAINT "College_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToCollege" ADD CONSTRAINT "_ApplicationToCollege_A_fkey" FOREIGN KEY ("A") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToCollege" ADD CONSTRAINT "_ApplicationToCollege_B_fkey" FOREIGN KEY ("B") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;
