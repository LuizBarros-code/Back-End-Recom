/*
  Warnings:

  - Added the required column `usuarioId` to the `descarte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donatarioId` to the `doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuariofisicoId` to the `doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuariojuridicoId` to the `doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donatariofisicoId` to the `doacaoUsuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donatariojuridicoId` to the `doacaoUsuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioid` to the `doacaoUsuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solicitacaofisicoId` to the `solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solicitacaojuridicoId` to the `solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioid` to the `solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "descarte" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "doacao" ADD COLUMN     "donatarioId" INTEGER NOT NULL,
ADD COLUMN     "usuariofisicoId" INTEGER NOT NULL,
ADD COLUMN     "usuariojuridicoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "doacaoUsuario" ADD COLUMN     "donatariofisicoId" INTEGER NOT NULL,
ADD COLUMN     "donatariojuridicoId" INTEGER NOT NULL,
ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "solicitacao" ADD COLUMN     "solicitacaofisicoId" INTEGER NOT NULL,
ADD COLUMN     "solicitacaojuridicoId" INTEGER NOT NULL,
ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "descarte" ADD CONSTRAINT "descarte_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_donatarioId_fkey" FOREIGN KEY ("donatarioId") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_usuariofisicoId_fkey" FOREIGN KEY ("usuariofisicoId") REFERENCES "pessoafisica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_usuariojuridicoId_fkey" FOREIGN KEY ("usuariojuridicoId") REFERENCES "pessoajuridica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacaoUsuario" ADD CONSTRAINT "doacaoUsuario_donatariofisicoId_fkey" FOREIGN KEY ("donatariofisicoId") REFERENCES "pessoafisica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacaoUsuario" ADD CONSTRAINT "doacaoUsuario_donatariojuridicoId_fkey" FOREIGN KEY ("donatariojuridicoId") REFERENCES "pessoajuridica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacaoUsuario" ADD CONSTRAINT "doacaoUsuario_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_solicitacaofisicoId_fkey" FOREIGN KEY ("solicitacaofisicoId") REFERENCES "pessoafisica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_solicitacaojuridicoId_fkey" FOREIGN KEY ("solicitacaojuridicoId") REFERENCES "pessoajuridica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
