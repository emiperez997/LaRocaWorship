/*
  Warnings:

  - You are about to drop the column `savedKey` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `originalKey` on the `Song` table. All the data in the column will be lost.
  - Added the required column `trasposedSteps` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "savedKey",
ADD COLUMN     "trasposedSteps" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "originalKey";
