import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PessoaJuridicaController {
  // Método para criar pessoa jurídica
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, cnpj, email, password, comprovanteDeProjeto, telefone, endereco } = request.body;

      // Verificar se o email já existe
      const existingPessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { email },
      });

      if (existingPessoaJuridica) {
        response.status(400).json({ message: "Email já está em uso" });
        return;
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const pessoaJuridica = await prisma.pessoajuridica.create({
        data: {
          name,
          cnpj,
          email,
          password: hashedPassword,
          comprovanteDeProjeto,
          telefone,
          endereco,
        },
      });

      response.status(201).json(pessoaJuridica);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler pessoa jurídica por ID
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const pessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { id: parseInt(id) },
      });

      if (!pessoaJuridica) {
        response.status(404).json({ message: "Pessoa Jurídica não encontrada" });
        return;
      }

      response.status(200).json(pessoaJuridica);
    } catch (error) {
      next(error);
    }
  };

  // Método para verificar credenciais
  verifyCredentials = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = request.body; // Extraindo do corpo da requisição
      const pessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { email },
      });

      if (!pessoaJuridica || !(await bcrypt.compare(password, pessoaJuridica.password))) {
        response.status(401).json({ message: "Email ou senha inválidos" });
        return;
      }

      response.json({ message: "Credenciais verificadas", pessoaJuridica });
    } catch (error) {
      next(error);
    }
  };

  // Método para buscar pessoa jurídica por email
  getByEmail = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = request.params;
      const pessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { email },
      });

      if (!pessoaJuridica) {
        response.status(404).json({ message: "Pessoa Jurídica não encontrada" });
        return;
      }

      response.status(200).json(pessoaJuridica);
    } catch (error) {
      next(error);
    }
  };

  // Método para buscar todas as pessoas jurídicas por nome
  getAllByName = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const pessoasJuridicas = await prisma.pessoajuridica.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      response.status(200).json(pessoasJuridicas);
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar pessoa jurídica
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { name, email, password, comprovanteDeProjeto, telefone, endereco } = request.body;

      const dataToUpdate: any = {};
      if (name) dataToUpdate.name = name;
      if (email) dataToUpdate.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        dataToUpdate.password = hashedPassword;
      }
      if (comprovanteDeProjeto) dataToUpdate.comprovanteDeProjeto = comprovanteDeProjeto;
      if (telefone) dataToUpdate.telefone = telefone;
      if (endereco) dataToUpdate.endereco = endereco;

      const updatedPessoaJuridica = await prisma.pessoajuridica.update({
        where: { id: parseInt(id) },
        data: dataToUpdate,
      });

      response.status(200).json({ message: "Pessoa Jurídica atualizada com sucesso", updatedPessoaJuridica });
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar pessoa jurídica (soft delete)
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;

      // Soft delete: marcar como deletado
      const deletedPessoaJuridica = await prisma.pessoajuridica.update({
        where: { id: parseInt(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      response.status(200).json({ message: "Pessoa Jurídica deletada com sucesso", deletedPessoaJuridica });
    } catch (error) {
      next(error);
    }
  };
}