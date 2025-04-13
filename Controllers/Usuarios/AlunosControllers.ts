import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class AlunoController {
  // Método para criar aluno
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password, matricula, curso, dias, bolsista, bolsistaTipo, cargo } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const aluno = await prisma.aluno.create({
        data: {
          name,
          email,
          password: hashedPassword,
          matricula,
          curso,
          dias,
          bolsistaTipo,
          cargo,
        },
      });
      response.status(201).json(aluno);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler aluno por ID
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

  // Método para buscar aluno por matrícula
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
      const { matricula, password } = request.body; // Extraindo do corpo da requisição
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
      const { id } = request.params;
      const { name, email, password, curso, dias, bolsista, bolsistaTipo, cargo } = request.body;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const aluno = await prisma.aluno.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          password: hashedPassword,
          curso,
          dias,
          bolsistaTipo,
          cargo,
        },
      });
      response.json(aluno);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar aluno (soft delete)
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const aluno = await prisma.aluno.update({
        where: { id: parseInt(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });
      response.status(200).json({ message: "Aluno deleted successfully", aluno });
    } catch (error) {
      next(error);
    }
  };
}