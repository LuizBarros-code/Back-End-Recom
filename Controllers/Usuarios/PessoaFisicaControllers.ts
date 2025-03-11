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
      const hashedPassword = await bcrypt.hash(password, 10);
      const pessoaFisica = await prisma.pessoafisica.create({
        data: {
          name,
          cpf,
          email,
          password: hashedPassword, // Hash the password before storing
          comprovanteDeBaixaRenda, // Replace with actual comprovante logic
          telefone, // Replace with actual telefone logic
        },
      });
      response.status(201).json(pessoaFisica);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler pessoa física
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { id: parseInt(id) },
      });
      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física not found" });
      } else {
        response.status(200).json(pessoaFisica);
      }
    } catch (error) {
      next(error);
    }
  };

  verifyCredentials = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = request.params; // Extraindo dos parâmetros da URL
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { email },
      });
      if (!pessoaFisica || !(await bcrypt.compare(password, pessoaFisica.password))) {
        response.status(401).json({ message: "Invalid email or password" });
        return;
      }
      response.json({ message: "Credentials verified", pessoaFisica });
    } catch (error) {
      next(error);
    }
  };

  getByEmail = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = request.params;
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { email },
      });
      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física not found" });
      } else {
        response.status(200).json(pessoaFisica);
      }
    } catch (error) {
      next(error);
    }
  };

  async getAllByName(req: Request, res: Response) {
    try {
      const names = await prisma.pessoafisica.findMany({
        select: { id: true,name: true },
      });
      res.json(names);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching names." });
    }
  }
  


  // Método para atualizar pessoa física
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = request.params;
        const { password, comprovanteDeBaixaRenda } = request.body;

        // Buscar a pessoa física pelo id
        const pessoaFisica = await prisma.pessoafisica.findUnique({
            where: { id: parseInt(id) },
        });

        if (!pessoaFisica) {
            response.status(404).json({ message: "Pessoa Fisica not found" });
            return;
        }

        const dataToUpdate: any = {};
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            dataToUpdate.password = hashedPassword;
        }
        if (comprovanteDeBaixaRenda) {
          dataToUpdate.comprovanteDeBaixaRenda = comprovanteDeBaixaRenda;
        }

        // Atualizar a pessoa física usando o id
        const updatedPessoaFisica = await prisma.pessoafisica.update({
            where: { id: pessoaFisica.id },
            data: dataToUpdate,
        });

        response.json({ message: "Pessoa Fisica updated successfully", updatedPessoaFisica });
    } catch (error) {
        next(error);
    }
  };

  // Método para deletar pessoa física
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.pessoafisica.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}