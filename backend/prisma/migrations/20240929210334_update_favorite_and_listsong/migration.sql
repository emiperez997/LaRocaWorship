/*
  Warnings:

  - A unique constraint covering the columns `[songId,userId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listId,songId]` on the table `ListSong` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_songId_userId_key" ON "Favorite"("songId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ListSong_listId_songId_key" ON "ListSong"("listId", "songId");
