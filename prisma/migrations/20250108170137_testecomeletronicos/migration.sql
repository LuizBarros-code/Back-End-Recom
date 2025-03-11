/*
  Warnings:

  - Added the required column `imagem` to the `fontedealimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `fontedealimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potencia` to the `fontedealimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `fontedealimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `hd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `hd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `hd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDeCapacidade` to the `hd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `teclado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `teclado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `teclado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDeConexao` to the `teclado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fontedealimentacao" ADD COLUMN     "imagem" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "potencia" INTEGER NOT NULL,
ADD COLUMN     "situacao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "hd" ADD COLUMN     "imagem" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "situacao" TEXT NOT NULL,
ADD COLUMN     "tipoDeCapacidade" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teclado" ADD COLUMN     "imagem" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "situacao" TEXT NOT NULL,
ADD COLUMN     "tipoDeConexao" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "gabinete" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,

    CONSTRAINT "gabinete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitor" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "polegadas" INTEGER NOT NULL,

    CONSTRAINT "monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mouse" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "tipoDeConexao" TEXT NOT NULL,

    CONSTRAINT "mouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estabilizador" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "potencia" INTEGER NOT NULL,

    CONSTRAINT "estabilizador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "impressora" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "tipoDeTinta" TEXT NOT NULL,

    CONSTRAINT "impressora_pkey" PRIMARY KEY ("id")
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
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,

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
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,

    CONSTRAINT "notebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processador" (
    "id" SERIAL NOT NULL,
    "codigoDereferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataDeChegada" TIMESTAMP(3) NOT NULL,
    "dataDeSaida" TIMESTAMP(3) NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,

    CONSTRAINT "processador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gabinete_codigoDereferencia_key" ON "gabinete"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "monitor_codigoDereferencia_key" ON "monitor"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "mouse_codigoDereferencia_key" ON "mouse"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "estabilizador_codigoDereferencia_key" ON "estabilizador"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "impressora_codigoDereferencia_key" ON "impressora"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "placamae_codigoDereferencia_key" ON "placamae"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "notebook_codigoDereferencia_key" ON "notebook"("codigoDereferencia");

-- CreateIndex
CREATE UNIQUE INDEX "processador_codigoDereferencia_key" ON "processador"("codigoDereferencia");
