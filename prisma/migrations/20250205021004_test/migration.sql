-- AlterTable
ALTER TABLE "estabilizador" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "fontedealimentacao" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "gabinete" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "hd" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "impressora" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "monitor" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "mouse" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "notebook" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "placamae" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "processador" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AlterTable
ALTER TABLE "teclado" ADD COLUMN     "descarteId" INTEGER,
ADD COLUMN     "doacaoId" INTEGER;

-- AddForeignKey
ALTER TABLE "teclado" ADD CONSTRAINT "teclado_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teclado" ADD CONSTRAINT "teclado_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hd" ADD CONSTRAINT "hd_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hd" ADD CONSTRAINT "hd_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fontedealimentacao" ADD CONSTRAINT "fontedealimentacao_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fontedealimentacao" ADD CONSTRAINT "fontedealimentacao_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gabinete" ADD CONSTRAINT "gabinete_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gabinete" ADD CONSTRAINT "gabinete_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor" ADD CONSTRAINT "monitor_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor" ADD CONSTRAINT "monitor_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouse" ADD CONSTRAINT "mouse_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouse" ADD CONSTRAINT "mouse_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estabilizador" ADD CONSTRAINT "estabilizador_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estabilizador" ADD CONSTRAINT "estabilizador_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impressora" ADD CONSTRAINT "impressora_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impressora" ADD CONSTRAINT "impressora_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placamae" ADD CONSTRAINT "placamae_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placamae" ADD CONSTRAINT "placamae_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook" ADD CONSTRAINT "notebook_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook" ADD CONSTRAINT "notebook_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processador" ADD CONSTRAINT "processador_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processador" ADD CONSTRAINT "processador_descarteId_fkey" FOREIGN KEY ("descarteId") REFERENCES "descarte"("id") ON DELETE SET NULL ON UPDATE CASCADE;
