import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DoacaoController {
  // Método para criar doação
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        name,
        codigoDeReferencias,
        descricao,
        justificativa,
        nomeOuEmpresa,
        contato,
        data,
        status,
        donatarioId,
        usuariofisicoId,
        usuariojuridicoId,
        teclados,
        hds,
        fontesDeAlimentacao,
        gabinetes,
        monitores,
        mouses,
        estabilizadores,
        impressoras,
        placasmae,
        notebooks,
        processadores
      } = request.body;

      console.log("Request Body:", request.body); // Verifique os dados recebidos

      // Verificar se os campos obrigatórios estão presentes
      if (!name || !codigoDeReferencias || !descricao || !justificativa || !nomeOuEmpresa || !contato || !data || !status) {
        response.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
        return;
      }

      // Converte os IDs para números (caso estejam como strings)
      const parsedDonatarioId = donatarioId ? parseInt(donatarioId, 10) : undefined;
      const parsedUsuariofisicoId = usuariofisicoId ? parseInt(usuariofisicoId, 10) : undefined;
      const parsedUsuariojuridicoId = usuariojuridicoId ? parseInt(usuariojuridicoId, 10) : undefined;

      const doacao = await prisma.doacao.create({
        data: {
          name,
          codigoDeReferencias,
          descricao,
          justificativa,
          nomeOuEmpresa,
          contato,
          data: new Date(data),
          status,
          donatarioId: parsedDonatarioId,
          usuariofisicoId: parsedUsuariofisicoId,
          usuariojuridicoId: parsedUsuariojuridicoId,
          teclados: {
            connect: teclados.map((id: number) => ({ id }))
          },
          hds: {
            connect: hds.map((id: number) => ({ id }))
          },
          fontesDeAlimentacao: {
            connect: fontesDeAlimentacao.map((id: number) => ({ id }))
          },
          gabinetes: {
            connect: gabinetes.map((id: number) => ({ id }))
          },
          monitores: {
            connect: monitores.map((id: number) => ({ id }))
          },
          mouses: {
            connect: mouses.map((id: number) => ({ id }))
          },
          estabilizadores: {
            connect: estabilizadores.map((id: number) => ({ id }))
          },
          impressoras: {
            connect: impressoras.map((id: number) => ({ id }))
          },
          placasmae: {
            connect: placasmae.map((id: number) => ({ id }))
          },
          notebooks: {
            connect: notebooks.map((id: number) => ({ id }))
          },
          processadores: {
            connect: processadores.map((id: number) => ({ id }))
          }
        },
      });
      response.status(201).json(doacao);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler doação
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const doacao = await prisma.doacao.findUnique({
        where: { id: parseInt(id) },
      });
      if (!doacao) {
        response.status(404).json({ message: "Doacao not found" });
        return;
      }
      response.json(doacao);
    } catch (error) {
      next(error);
    }
  };

  readAll = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const doacoes = await prisma.doacao.findMany();
      response.status(200).json(doacoes);
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar doação
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { name, codigoDeReferencias, descricao, justificativa, nomeOuEmpresa, contato, data, status } = request.body;
      const doacao = await prisma.doacao.update({
        where: { id: parseInt(id) },
        data: {
          name,
          codigoDeReferencias,
          descricao,
          justificativa,
          nomeOuEmpresa,
          contato,
          data: new Date(data),
          status,
        },
      });
      response.json(doacao);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar doação
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.doacao.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default DoacaoController;