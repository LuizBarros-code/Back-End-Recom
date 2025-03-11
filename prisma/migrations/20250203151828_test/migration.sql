/*
  Warnings:

  - You are about to drop the column `capacidade` on the `hd` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `estabilizador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `fontedealimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `gabinete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `impressora` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `monitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `mouse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `notebook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `placamae` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `processador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estabilizador" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "fontedealimentacao" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "gabinete" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "hd" DROP COLUMN "capacidade",
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "usuarioId" INTEGER;

-- AlterTable
ALTER TABLE "impressora" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "monitor" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "mouse" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "notebook" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "placamae" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "processador" ADD COLUMN     "alunoid" INTEGER,
ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "teclado" ADD COLUMN     "modificadorid" INTEGER,
ADD COLUMN     "usuarioId" INTEGER,
ALTER COLUMN "dataDeSaida" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "teclado" ADD CONSTRAINT "teclado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teclado" ADD CONSTRAINT "teclado_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hd" ADD CONSTRAINT "hd_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hd" ADD CONSTRAINT "hd_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fontedealimentacao" ADD CONSTRAINT "fontedealimentacao_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fontedealimentacao" ADD CONSTRAINT "fontedealimentacao_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gabinete" ADD CONSTRAINT "gabinete_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gabinete" ADD CONSTRAINT "gabinete_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor" ADD CONSTRAINT "monitor_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor" ADD CONSTRAINT "monitor_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouse" ADD CONSTRAINT "mouse_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouse" ADD CONSTRAINT "mouse_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estabilizador" ADD CONSTRAINT "estabilizador_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estabilizador" ADD CONSTRAINT "estabilizador_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impressora" ADD CONSTRAINT "impressora_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impressora" ADD CONSTRAINT "impressora_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placamae" ADD CONSTRAINT "placamae_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placamae" ADD CONSTRAINT "placamae_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook" ADD CONSTRAINT "notebook_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook" ADD CONSTRAINT "notebook_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processador" ADD CONSTRAINT "processador_alunoid_fkey" FOREIGN KEY ("alunoid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processador" ADD CONSTRAINT "processador_modificadorid_fkey" FOREIGN KEY ("modificadorid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;
