import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class AlunoController {
  // Método para criar aluno
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password, matricula, curso,dias } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const aluno = await prisma.aluno.create({
        data: {
          name,
          email,
          password: hashedPassword,
          matricula,
          curso,
          dias
        },
      });
      response.status(201).json(aluno);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler aluno
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const aluno = await prisma.aluno.findUnique({
        where: { id: parseInt(id) },
      });
      if (!aluno) {
        response.status(404).json({ message: "Aluno not found" });
        return;
      }
      response.json(aluno);
    } catch (error) {
      next(error);
    }
  };

  //Metodo para buscar aluno por matricula
  getByMatricula = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { matricula } = request.params;
      const aluno = await prisma.aluno.findUnique({
        where: { matricula },
      });
      if (!aluno) {
        response.status(404).json({ message: "Aluno not found" });
      } else {
        response.status(200).json(aluno);
      }
    } catch (error) {
      next(error);
    }
  };

  // Método para verificar matrícula e senha
  verifyCredentials = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { matricula, password } = request.params; // Extraindo dos parâmetros da URL
      const aluno = await prisma.aluno.findUnique({
        where: { matricula },
      });
      if (!aluno || !(await bcrypt.compare(password, aluno.password))) {
        response.status(401).json({ message: "Invalid matricula or password" });
        return;
      }
      response.json({ message: "Credentials verified", aluno });
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar aluno
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = request.params;
      const { password } = request.body;
      const aluno = await prisma.aluno.update({
        where: { id: parseInt(email) },
        data: {
          password,
        },
      });
      response.json(aluno);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar aluno
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.aluno.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}