-- CreateTable
CREATE TABLE "aluno" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoafisica" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "comprovanteDeBaixaRenda" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoafisica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoajuridica" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "comprovanteDeProjeto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoajuridica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teclado" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teclado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mouse" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitor" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "polegadas" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gabinete" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gabinete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placamae" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "placamae_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notebook" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hd" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fontedealimentacao" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "potencia" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fontedealimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoafisica_email_key" ON "pessoafisica"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoafisica_cpf_key" ON "pessoafisica"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoajuridica_email_key" ON "pessoajuridica"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoajuridica_cnpj_key" ON "pessoajuridica"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "teclado_codigoDereferencia_key" ON "teclado"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "mouse_codigoDereferencia_key" ON "mouse"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "monitor_codigoDereferencia_key" ON "monitor"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "gabinete_codigoDereferencia_key" ON "gabinete"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "placamae_codigoDereferencia_key" ON "placamae"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "notebook_codigoDereferencia_key" ON "notebook"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "hd_codigoDereferencia_key" ON "hd"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "fontedealimentacao_codigoDereferencia_key" ON "fontedealimentacao"("codigoDereferencia");
