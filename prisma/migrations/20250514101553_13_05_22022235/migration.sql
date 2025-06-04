/*
  Warnings:

  - You are about to drop the column `data` on the `solicitacao` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `descarte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "descarte" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "doacao" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "solicitacao" DROP COLUMN "data",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "horarioparapegar" DROP NOT NULL,
ALTER COLUMN "dataparapegar" DROP NOT NULL;
