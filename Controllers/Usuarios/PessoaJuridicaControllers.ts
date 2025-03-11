import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PessoaJuridicaController {
  // Método para criar pessoa jurídica
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, cnpj, email, password } = request.body;

      // Verificar se o email já existe
      const existingPessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { email },
      });

      if (existingPessoaJuridica) {
        response.status(400).json({ message: "Email já está em uso" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const pessoaJuridica = await prisma.pessoajuridica.create({
        data: {
          name,
          cnpj,
          email,
          password: hashedPassword , // Replace with actual password logic
          comprovanteDeProjeto: request.body.comprovanteDeProjeto, // Replace with actual comprovante logic
          telefone: request.body.telefone, // Replace with actual telefone logic
          endereco: request.body.endereco, // Replace with actual endereco logic
        },
      });
      response.status(201).json(pessoaJuridica);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler pessoa jurídica
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const pessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { id: parseInt(id) },
      });
      if (!pessoaJuridica) {
        response.status(404).json({ message: "Pessoa Jurídica not found" });
      } else {
        response.status(200).json(pessoaJuridica);
      }
    } catch (error) {
      next(error);
    }
  };

  //Metodo para verificar credenciais
  verifyCredentials = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = request.params; // Extraindo dos parâmetros da URL
      const pessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { email },
      });
      if (!pessoaJuridica || !(await bcrypt.compare(password, pessoaJuridica.password))) {
        response.status(401).json({ message: "Invalid email or password" });
        return;
      }
      response.json({ message: "Credentials verified", pessoaJuridica });
    } catch (error) {
      next(error);
    }
  };

  // Método para obter informações do usuário através do email
  getByEmail = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = request.params;
      const pessoaJuridica = await prisma.pessoajuridica.findUnique({
        where: { email },
      });
      if (!pessoaJuridica) {
        response.status(404).json({ message: "Pessoa Jurídica not found" });
      } else {
        response.status(200).json(pessoaJuridica);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllByName = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const pessoasJuridicas = await prisma.pessoajuridica.findMany({
        select: {
          id: true, // Inclui o campo ID no resultado
          name: true,
        },
      });
      response.json(pessoasJuridicas);
    } catch (error) {
      next(error);
    }
  };
  


  // Método para atualizar pessoa jurídica
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { email } = request.params;
        const { password, comprovanteProjeto } = request.body;

        const dataToUpdate: any = {};
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            dataToUpdate.password = hashedPassword;
        }
        if (comprovanteProjeto) {
            dataToUpdate.comprovanteProjeto = comprovanteProjeto;
        }

        const updatedPessoaJuridica = await prisma.pessoajuridica.update({
            where: { id: Number(email) },
            data: dataToUpdate,
        });

        response.json({ message: "Pessoa Juridica updated successfully", updatedPessoaJuridica });
    } catch (error) {
        next(error);
    }
};

  // Método para deletar pessoa jurídica
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.pessoajuridica.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}