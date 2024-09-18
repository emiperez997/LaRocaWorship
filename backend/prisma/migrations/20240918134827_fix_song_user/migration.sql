/*
  Warnings:

  - The `category` column on the `Song` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `initialPhrase` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "initialPhrase" SET NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT[],
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
