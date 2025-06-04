/*
  Warnings:

  - You are about to drop the column `eletronicos` on the `doacaoUsuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doacaoUsuario" DROP COLUMN "eletronicos";

-- AlterTable
ALTER TABLE "estabilizador" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "fontedealimentacao" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "gabinete" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "hd" ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "impressora" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "monitor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "mouse" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "notebook" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "placamae" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "processador" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doacaousuarioId" INTEGER;

-- AlterTable
ALTER TABLE "teclado" ADD COLUMN     "doacaousuarioId" INTEGER;

-- AddForeignKey
ALTER TABLE "teclado" ADD CONSTRAINT "teclado_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hd" ADD CONSTRAINT "hd_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fontedealimentacao" ADD CONSTRAINT "fontedealimentacao_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gabinete" ADD CONSTRAINT "gabinete_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor" ADD CONSTRAINT "monitor_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouse" ADD CONSTRAINT "mouse_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estabilizador" ADD CONSTRAINT "estabilizador_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impressora" ADD CONSTRAINT "impressora_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placamae" ADD CONSTRAINT "placamae_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook" ADD CONSTRAINT "notebook_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processador" ADD CONSTRAINT "processador_doacaousuarioId_fkey" FOREIGN KEY ("doacaousuarioId") REFERENCES "doacaoUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
