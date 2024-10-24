/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
