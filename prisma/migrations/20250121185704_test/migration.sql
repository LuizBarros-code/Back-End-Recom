-- CreateTable
CREATE TABLE "solicitacao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eletronicos" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL,
    "horarioparapegar" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "dataparapegar" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "solicitacao_pkey" PRIMARY KEY ("id")
);
