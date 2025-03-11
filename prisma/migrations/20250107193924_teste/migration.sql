/*
  Warnings:

  - You are about to drop the column `createdAt` on the `fontedealimentacao` table. All the data in the column will be lost.
  - You are about to drop the column `potencia` on the `fontedealimentacao` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `fontedealimentacao` table. All the data in the column will be lost.
  - You are about to drop the `gabinete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monitor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mouse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notebook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `placamae` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `marca` to the `teclado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `teclado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fontedealimentacao" DROP COLUMN "createdAt",
DROP COLUMN "potencia",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "teclado" ADD COLUMN     "marca" TEXT NOT NULL,
ADD COLUMN     "modelo" TEXT NOT NULL;

-- DropTable
DROP TABLE "gabinete";

-- DropTable
DROP TABLE "monitor";

-- DropTable
DROP TABLE "mouse";

-- DropTable
DROP TABLE "notebook";

-- DropTable
DROP TABLE "placamae";
