/*
  Warnings:

  - Added the required column `codigoDeReferencias` to the `descarte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "descarte" ADD COLUMN     "codigoDeReferencias" TEXT NOT NULL;
