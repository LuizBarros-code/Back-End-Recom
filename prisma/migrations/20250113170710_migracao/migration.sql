/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `aluno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "aluno_matricula_key" ON "aluno"("matricula");
