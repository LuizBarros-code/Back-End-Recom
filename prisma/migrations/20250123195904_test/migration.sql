/*
  Warnings:

  - You are about to drop the column `codigoDeReferencias` on the `descarte` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "descarte" DROP CONSTRAINT "descarte_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "doacao" DROP CONSTRAINT "doacao_donatarioId_fkey";

-- DropForeignKey
ALTER TABLE "doacao" DROP CONSTRAINT "doacao_usuariofisicoId_fkey";

-- DropForeignKey
ALTER TABLE "doacao" DROP CONSTRAINT "doacao_usuariojuridicoId_fkey";

-- DropForeignKey
ALTER TABLE "doacaoUsuario" DROP CONSTRAINT "doacaoUsuario_donatariofisicoId_fkey";

-- DropForeignKey
ALTER TABLE "doacaoUsuario" DROP CONSTRAINT "doacaoUsuario_donatariojuridicoId_fkey";

-- DropForeignKey
ALTER TABLE "doacaoUsuario" DROP CONSTRAINT "doacaoUsuario_usuarioid_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao" DROP CONSTRAINT "solicitacao_solicitacaofisicoId_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao" DROP CONSTRAINT "solicitacao_solicitacaojuridicoId_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao" DROP CONSTRAINT "solicitacao_usuarioid_fkey";

-- AlterTable
ALTER TABLE "descarte" DROP COLUMN "codigoDeReferencias",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "usuarioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "doacao" ALTER COLUMN "donatarioId" DROP NOT NULL,
ALTER COLUMN "usuariofisicoId" DROP NOT NULL,
ALTER COLUMN "usuariojuridicoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "doacaoUsuario" ALTER COLUMN "donatariofisicoId" DROP NOT NULL,
ALTER COLUMN "donatariojuridicoId" DROP NOT NULL,
ALTER COLUMN "usuarioid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "solicitacao" ALTER COLUMN "solicitacaofisicoId" DROP NOT NULL,
ALTER COLUMN "solicitacaojuridicoId" DROP NOT NULL,
ALTER COLUMN "usuarioid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "descarte" ADD CONSTRAINT "descarte_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_donatarioId_fkey" FOREIGN KEY ("donatarioId") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_usuariofisicoId_fkey" FOREIGN KEY ("usuariofisicoId") REFERENCES "pessoafisica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_usuariojuridicoId_fkey" FOREIGN KEY ("usuariojuridicoId") REFERENCES "pessoajuridica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacaoUsuario" ADD CONSTRAINT "doacaoUsuario_donatariofisicoId_fkey" FOREIGN KEY ("donatariofisicoId") REFERENCES "pessoafisica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacaoUsuario" ADD CONSTRAINT "doacaoUsuario_donatariojuridicoId_fkey" FOREIGN KEY ("donatariojuridicoId") REFERENCES "pessoajuridica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacaoUsuario" ADD CONSTRAINT "doacaoUsuario_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_solicitacaofisicoId_fkey" FOREIGN KEY ("solicitacaofisicoId") REFERENCES "pessoafisica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_solicitacaojuridicoId_fkey" FOREIGN KEY ("solicitacaojuridicoId") REFERENCES "pessoajuridica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;
