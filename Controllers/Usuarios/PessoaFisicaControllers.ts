import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PessoaFisicaController {
  // Método para criar pessoa física
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, cpf, email, password, comprovanteDeBaixaRenda, telefone } = request.body;

      // Verificar se o email já existe
      const existingPessoaFisica = await prisma.pessoafisica.findUnique({
        where: { email },
      });

      if (existingPessoaFisica) {
        response.status(400).json({ message: "Email já está em uso" });
        return;
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const pessoaFisica = await prisma.pessoafisica.create({
        data: {
          name,
          cpf,
          email,
          password: hashedPassword,
          comprovanteDeBaixaRenda,
          telefone,
        },
      });

      response.status(201).json(pessoaFisica);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler pessoa física por ID
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { id: parseInt(id) },
      });

      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física não encontrada" });
        return;
      }

      response.status(200).json(pessoaFisica);
    } catch (error) {
      next(error);
    }
  };

  // Método para verificar credenciais
  verifyCredentials = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = request.body; // Extraindo do corpo da requisição
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { email },
      });

      if (!pessoaFisica || !(await bcrypt.compare(password, pessoaFisica.password))) {
        response.status(401).json({ message: "Email ou senha inválidos" });
        return;
      }

      response.json({ message: "Credenciais verificadas", pessoaFisica });
    } catch (error) {
      next(error);
    }
  };

  // Método para buscar pessoa física por email
  getByEmail = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = request.params;
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { email },
      });

      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física não encontrada" });
        return;
      }

      response.status(200).json(pessoaFisica);
    } catch (error) {
      next(error);
    }
  };

  // Método para buscar todas as pessoas físicas por nome
  getAllByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const names = await prisma.pessoafisica.findMany({
        select: { id: true, name: true },
      });

      res.status(200).json(names);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar nomes." });
    }
  };

  // Método para atualizar pessoa física
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { name, email, password, comprovanteDeBaixaRenda, telefone } = request.body;

      // Buscar a pessoa física pelo ID
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { id: parseInt(id) },
      });

      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física não encontrada" });
        return;
      }

      const dataToUpdate: any = {};
      if (name) dataToUpdate.name = name;
      if (email) dataToUpdate.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        dataToUpdate.password = hashedPassword;
      }
      if (comprovanteDeBaixaRenda) dataToUpdate.comprovanteDeBaixaRenda = comprovanteDeBaixaRenda;
      if (telefone) dataToUpdate.telefone = telefone;

      // Atualizar a pessoa física
      const updatedPessoaFisica = await prisma.pessoafisica.update({
        where: { id: parseInt(id) },
        data: dataToUpdate,
      });

      response.status(200).json({ message: "Pessoa Física atualizada com sucesso", updatedPessoaFisica });
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar pessoa física
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;

      // Soft delete: marcar como deletado
      const deletedPessoaFisica = await prisma.pessoafisica.update({
        where: { id: parseInt(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      response.status(200).json({ message: "Pessoa Física deletada com sucesso", deletedPessoaFisica });
    } catch (error) {
      next(error);
    }
  };
}