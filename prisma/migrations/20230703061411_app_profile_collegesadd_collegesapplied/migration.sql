/*
  Warnings:

  - You are about to drop the column `collegesAdded` on the `users` table. All the data in the column will be lost.
  - Added the required column `collegesAdded` to the `applicationprofiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegesApplied` to the `applicationprofiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicationprofiles" ADD COLUMN     "collegesAdded" TEXT NOT NULL,
ADD COLUMN     "collegesApplied" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "collegesAdded";
