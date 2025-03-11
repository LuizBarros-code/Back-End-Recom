-- CreateTable
CREATE TABLE "descarte" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "codigoDeReferencias" TEXT NOT NULL,

    CONSTRAINT "descarte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doacao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "codigoDeReferencias" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "justificativa" TEXT NOT NULL,
    "nomeOuEmpresa" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doacaoUsuario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eletronicos" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "informacoesAdicionais" TEXT NOT NULL,
    "horarioDeEntrega" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doacaoUsuario_pkey" PRIMARY KEY ("id")
);
