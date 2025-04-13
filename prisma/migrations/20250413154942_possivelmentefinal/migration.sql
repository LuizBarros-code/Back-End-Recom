/*
  Warnings:

  - You are about to drop the column `bolsista` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `estabilizador` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `fontedealimentacao` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `gabinete` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `impressora` table. All the data in the column will be lost.
  - You are about to drop the column `bolsista` on the `inscrito` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `monitor` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `mouse` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `notebook` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `placamae` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `processador` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Imagem" ADD COLUMN     "estabilizadorId" INTEGER,
ADD COLUMN     "fontedealimentacaoId" INTEGER,
ADD COLUMN     "gabineteId" INTEGER,
ADD COLUMN     "impressoraId" INTEGER,
ADD COLUMN     "monitorId" INTEGER,
ADD COLUMN     "mouseId" INTEGER,
ADD COLUMN     "notebookId" INTEGER,
ADD COLUMN     "placamaeId" INTEGER,
ADD COLUMN     "processadorId" INTEGER;

-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "bolsista",
ALTER COLUMN "cargo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "estabilizador" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "fontedealimentacao" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "gabinete" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "impressora" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "inscrito" DROP COLUMN "bolsista",
ADD COLUMN     "bolsistaTipo" TEXT;

-- AlterTable
ALTER TABLE "monitor" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "mouse" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "notebook" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "placamae" DROP COLUMN "imagem";

-- AlterTable
ALTER TABLE "processador" DROP COLUMN "imagem";

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_fontedealimentacaoId_fkey" FOREIGN KEY ("fontedealimentacaoId") REFERENCES "fontedealimentacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_gabineteId_fkey" FOREIGN KEY ("gabineteId") REFERENCES "gabinete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_mouseId_fkey" FOREIGN KEY ("mouseId") REFERENCES "mouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_estabilizadorId_fkey" FOREIGN KEY ("estabilizadorId") REFERENCES "estabilizador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_impressoraId_fkey" FOREIGN KEY ("impressoraId") REFERENCES "impressora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_placamaeId_fkey" FOREIGN KEY ("placamaeId") REFERENCES "placamae"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "notebook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_processadorId_fkey" FOREIGN KEY ("processadorId") REFERENCES "processador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
