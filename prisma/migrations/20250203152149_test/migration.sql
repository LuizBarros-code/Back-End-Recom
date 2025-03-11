/*
  Warnings:

  - Added the required column `capacidade` to the `hd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hd" ADD COLUMN     "capacidade" INTEGER NOT NULL;
