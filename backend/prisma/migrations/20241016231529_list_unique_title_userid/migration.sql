/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "List_title_userId_key" ON "List"("title", "userId");
