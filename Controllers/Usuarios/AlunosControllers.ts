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

      // Verifica se a matrícula já existe
      const existingAluno = await prisma.aluno.findUnique({
        where: { matricula },
      });
      if (existingAluno) {
        response.status(400).json({ message: "Matrícula já existe" });
        return;
      }
      // Verifica se o email já existe
      const existingEmail = await prisma.aluno.findUnique({
        where: { email },
      });
      if (existingEmail) {
        response.status(400).json({ message: "Email já existe" });
        return;
      }
      const aluno = await prisma.aluno.create({
        data: {
          name,
          email,
          password: hashedPassword,
          matricula,
          curso,
          dias: "",
          horario: "",
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
  // Método para listar alunos
  list = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const alunos = await prisma.aluno.findMany({
        where: { deleted: false },
      });
      response.json(alunos);
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
      response.json({ message: "Credentials verified", id: aluno.id });
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar apenas a senha do aluno
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { password } = request.body;

      const aluno = await prisma.aluno.findUnique({
        where: { id: parseInt(id) },
      });

      if (!aluno) {
        response.status(404).json({ message: "Aluno não encontrado" });
        return;
      }

      if (!password) {
        response.status(400).json({ message: "A senha é obrigatória para atualização." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedAluno = await prisma.aluno.update({
        where: { id: parseInt(id) },
        data: { password: hashedPassword },
      });

      // Remove a senha do objeto retornado
      const { password: _, ...alunoSemSenha } = updatedAluno;

      response.json({ 
        message: "Senha atualizada com sucesso", 
        aluno: alunoSemSenha 
      });
    } catch (error) {
      next(error);
    }
  };

  //metodo para atualizar dias, horario e cargo
  updateCargo = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { dias, horario, cargo } = request.body;

      const aluno = await prisma.aluno.update({
        where: { id: parseInt(id) },
        data: {
          dias,
          horario,
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

  // Método para verificar se o aluno existe (esqueci minha senha)
  forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { matricula } = request.body;
      
      if (!matricula) {
        response.status(400).json({ message: "Matrícula é obrigatória" });
        return;
      }

      const aluno = await prisma.aluno.findUnique({
        where: { matricula },
      });

      if (!aluno) {
        response.status(404).json({ message: "Aluno não encontrado" });
        return;
      }

      response.status(200).json({ 
        message: "Aluno encontrado",
        id: aluno.id,
        email: aluno.email 
      });
    } catch (error) {
      next(error);
    }
  };
}