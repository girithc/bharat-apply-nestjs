-- AlterTable
ALTER TABLE "applicationprofiles" ALTER COLUMN "collegesAdded" SET DEFAULT ARRAY['']::TEXT[],
ALTER COLUMN "collegesApplied" SET DEFAULT ARRAY['']::TEXT[];
