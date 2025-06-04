import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DoacaoUsuarioController {
  // Método para criar doação de usuário
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, eletronicos, descricao, informacoesAdicionais, horarioDeEntrega, contato, data, status, donatariofisico, donatariojuridico, usuario } = request.body;
      const doacaoUsuario = await prisma.doacaoUsuario.create({
        data: {
          name,
          eletronicos,
          descricao,
          informacoesAdicionais,
          horarioDeEntrega,
          contato,
          data: new Date(data),
          status,
          donatariofisicoId: donatariofisico || null,
          donatariojuridicoId: donatariojuridico || null,
          usuarioid: usuario || null,
        },
      });
      response.status(201).json(doacaoUsuario);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler doação de usuário
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const doacaoUsuario = await prisma.doacaoUsuario.findUnique({
        where: { id: parseInt(id) },
      });
      if (!doacaoUsuario) {
        response.status(404).json({ message: "DoacaoUsuario not found" });
        return;
      }
      response.json(doacaoUsuario);
    } catch (error) {
      next(error);
    }
  };

  getDoacoes = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { userId, userType } = request.params;

    try {
      let doacoes;
      if (userType === 'fisico') {
        doacoes = await prisma.doacaoUsuario.findMany({
          where: { donatariofisicoId: parseInt(userId) },
        });
      } else if (userType === 'juridico') {
        doacoes = await prisma.doacaoUsuario.findMany({
          where: { donatariojuridicoId: parseInt(userId) },
        });
      } else {
        response.status(400).json({ message: 'Tipo de usuário inválido' });
        return;
      }

      response.json(doacoes);
    } catch (error) {
      next(error);
    }
  };

  readAll = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const doacoesUsuarios = await prisma.doacaoUsuario.findMany();
      response.status(200).json(doacoesUsuarios);
    } catch (error) {
      next(error);
    }
  };


  // Método para atualizar doação de usuário
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { name, eletronicos, descricao, informacoesAdicionais, horarioDeEntrega, contato, data } = request.body;
      const doacaoUsuario = await prisma.doacaoUsuario.update({
        where: { id: parseInt(id) },
        data: {
          name,
          eletronicos,
          descricao,
          informacoesAdicionais,
          horarioDeEntrega,
          contato,
          data: new Date(data),
        },
      });
      response.json(doacaoUsuario);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar doação de usuário
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.doacaoUsuario.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default DoacaoUsuarioController;