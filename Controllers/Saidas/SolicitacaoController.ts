import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SolicitacaoController {
  // Método para criar solicitação
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, eletronicos, descricao, contato, data, status, usuario, usuariosolicitacaofisico, donatariojuridico, horarioparapegar, informacoes } = request.body;
      const solicitacao = await prisma.solicitacao.create({
        data: {
          name,
          eletronicos,
          descricao,
          informacoes ,
          horarioparapegar,
          contato,
          data: new Date(data),
          status,
          dataparapegar: new Date(),
          usuario,
          usuariosolicitacaofisico,
          donatariojuridico 
        },
      });
      response.status(201).json(solicitacao);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler solicitação
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const solicitacao = await prisma.solicitacao.findUnique({
        where: { id: parseInt(id) },
      });
      if (!solicitacao) {
        response.status(404).json({ message: "Solicitação não encontrada" });
        return;
      }
      response.json(solicitacao);
    } catch (error) {
      next(error);
    }
  };

  getSolicitacoes = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { userId, userType } = request.params;

    try {
      let solicitacoes;
      if (userType === 'fisico') {
        solicitacoes = await prisma.solicitacao.findMany({
          where: { usuariosolicitacaofisico: { id: parseInt(userId) } },
        });
      } else if (userType === 'juridico') {
        solicitacoes = await prisma.solicitacao.findMany({
          where: { donatariojuridico: { id: parseInt(userId) } },
        });
      } else {
        response.status(400).json({ message: 'Tipo de usuário inválido' });
        return;
      }

      response.json(solicitacoes);
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar solicitação
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { informacoes, horarioparapegar, dataparapegar } = request.body;
      const solicitacao = await prisma.solicitacao.update({
        where: { id: parseInt(id) },
        data: {
          informacoes: informacoes,
          horarioparapegar,
          dataparapegar: new Date(dataparapegar),
        },
      });
      response.json(solicitacao);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar solicitação
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.solicitacao.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  readAll = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const solicitacoes = await prisma.solicitacao.findMany();
      response.status(200).json(solicitacoes);
    } catch (error) {
      next(error);
    }
  };
}

export default SolicitacaoController;