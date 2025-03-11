/*
  Warnings:

  - Added the required column `dias` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "dias" TEXT NOT NULL;
