/*
  Warnings:

  - You are about to drop the column `category` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "category",
ADD COLUMN     "categories" TEXT[];
