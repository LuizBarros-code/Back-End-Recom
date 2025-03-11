/*
  Warnings:

  - Added the required column `status` to the `doacaoUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doacaoUsuario" ADD COLUMN     "status" TEXT NOT NULL;
