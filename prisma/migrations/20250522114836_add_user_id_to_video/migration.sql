-- This is an empty migration.

ALTER TABLE "Video" ADD COLUMN "userId" TEXT;

-- Set a temporary value for existing rows to satisfy NOT NULL constraint
-- Replace 'TEMP_USER_ID' with a real Clerk userId if you have one
UPDATE "Video" SET "userId" = 'TEMP_USER_ID';

-- Now make the column NOT NULL
ALTER TABLE "Video" ALTER COLUMN "userId" SET NOT NULL;
