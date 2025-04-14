/*
  Warnings:

  - Added the required column `status` to the `inscrito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inscrito" ADD COLUMN     "status" TEXT NOT NULL;
