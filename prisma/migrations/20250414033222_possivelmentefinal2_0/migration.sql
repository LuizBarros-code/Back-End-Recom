/*
  Warnings:

  - Added the required column `tipo` to the `pessoafisica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `pessoajuridica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoafisica" ADD COLUMN     "tipo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pessoajuridica" ADD COLUMN     "tipo" TEXT NOT NULL;
