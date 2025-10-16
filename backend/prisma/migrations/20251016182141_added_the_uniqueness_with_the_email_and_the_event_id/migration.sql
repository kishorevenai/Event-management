/*
  Warnings:

  - A unique constraint covering the columns `[email,eventId]` on the table `People` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."People_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "People_email_eventId_key" ON "People"("email", "eventId");
