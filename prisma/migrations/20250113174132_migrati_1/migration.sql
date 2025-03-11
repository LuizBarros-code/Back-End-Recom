/*
  Warnings:

  - Added the required column `telefone` to the `pessoafisica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `pessoajuridica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `pessoajuridica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoafisica" ADD COLUMN     "telefone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pessoajuridica" ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;
