-- CreateTable
CREATE TABLE "inscrito" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dias" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,

    CONSTRAINT "inscrito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inscrito_email_key" ON "inscrito"("email");

-- CreateIndex
CREATE UNIQUE INDEX "inscrito_matricula_key" ON "inscrito"("matricula");
