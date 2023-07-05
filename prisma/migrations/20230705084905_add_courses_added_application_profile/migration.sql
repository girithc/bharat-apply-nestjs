-- AlterTable
ALTER TABLE "applicationprofiles" ADD COLUMN     "coursesAdded" JSONB,
ADD COLUMN     "coursesApplied" JSONB,
ALTER COLUMN "collegesAdded" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "collegesApplied" SET DEFAULT ARRAY[]::TEXT[];
