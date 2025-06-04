/*
  Warnings:

  - You are about to drop the column `doacaousuarioId` on the `estabilizador` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `fontedealimentacao` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `gabinete` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `hd` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `impressora` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `monitor` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `mouse` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `notebook` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `placamae` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `processador` table. All the data in the column will be lost.
  - You are about to drop the column `doacaousuarioId` on the `teclado` table. All the data in the column will be lost.
  - Added the required column `eletronicos` to the `doacaoUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "estabilizador" DROP CONSTRAINT "estabilizador_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "fontedealimentacao" DROP CONSTRAINT "fontedealimentacao_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "gabinete" DROP CONSTRAINT "gabinete_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "hd" DROP CONSTRAINT "hd_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "impressora" DROP CONSTRAINT "impressora_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "monitor" DROP CONSTRAINT "monitor_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "mouse" DROP CONSTRAINT "mouse_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "notebook" DROP CONSTRAINT "notebook_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "placamae" DROP CONSTRAINT "placamae_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "processador" DROP CONSTRAINT "processador_doacaousuarioId_fkey";

-- DropForeignKey
ALTER TABLE "teclado" DROP CONSTRAINT "teclado_doacaousuarioId_fkey";

-- AlterTable
ALTER TABLE "doacaoUsuario" ADD COLUMN     "eletronicos" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "estabilizador" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "fontedealimentacao" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "gabinete" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "hd" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "impressora" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "monitor" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "mouse" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "notebook" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "placamae" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "processador" DROP COLUMN "doacaousuarioId";

-- AlterTable
ALTER TABLE "teclado" DROP COLUMN "doacaousuarioId";
