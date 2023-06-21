-- AlterTable
ALTER TABLE "applicationprofiles" ADD COLUMN     "college" TEXT[] DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "grades" ALTER COLUMN "classTwelveEnrollmentNo" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isCollege" BOOLEAN NOT NULL DEFAULT false;

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
CREATE TABLE "_ApplicationToCollege" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "College_code_key" ON "College"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationToCollege_AB_unique" ON "_ApplicationToCollege"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationToCollege_B_index" ON "_ApplicationToCollege"("B");

-- AddForeignKey
ALTER TABLE "College" ADD CONSTRAINT "College_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToCollege" ADD CONSTRAINT "_ApplicationToCollege_A_fkey" FOREIGN KEY ("A") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToCollege" ADD CONSTRAINT "_ApplicationToCollege_B_fkey" FOREIGN KEY ("B") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;
