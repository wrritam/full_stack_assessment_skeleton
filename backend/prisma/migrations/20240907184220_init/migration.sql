/*
  Warnings:

  - You are about to drop the column `userid` on the `home` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "home" DROP CONSTRAINT "home_userid_fkey";

-- AlterTable
ALTER TABLE "home" DROP COLUMN "userid";

-- CreateTable
CREATE TABLE "UserHome" (
    "userId" INTEGER NOT NULL,
    "homeId" INTEGER NOT NULL,

    CONSTRAINT "UserHome_pkey" PRIMARY KEY ("userId","homeId")
);

-- AddForeignKey
ALTER TABLE "UserHome" ADD CONSTRAINT "UserHome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHome" ADD CONSTRAINT "UserHome_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "home"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
