import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class CoordenadorController {
  // Obter todos os coordenadores
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const coordenadores = await prisma.coordenador.findMany({
        where: { deleted: false }, // Excluir coordenadores marcados como deletados
      });
      res.status(200).json(coordenadores);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Obter um coordenador por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const coordenador = await prisma.coordenador.findUnique({
        where: { id: Number(id) },
      });
      if (coordenador && !coordenador.deleted) {
        res.status(200).json(coordenador);
      } else {
        res.status(404).json({ error: "Coordenador not found or deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }


    // Verificar e-mail e senha
    async verifyEmailAndPassword(req: Request, res: Response): Promise<void> {
      try {
        const { email, password } = req.body; // Dados enviados no corpo da requisição
    
        // Buscar coordenador pelo e-mail
        const coordenador = await prisma.coordenador.findUnique({
          where: { email },
        });
    
        if (!coordenador || coordenador.deleted) {
          res.status(404).json({ error: "Coordenador not found or deleted" });
          return;
        }
    
        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, coordenador.password);
    
        if (!isPasswordValid) {
          res.status(401).json({ error: "Invalid email or password" });
          return;
        }
    
        res.status(200).json({ message: "Login successful", coordenador });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }

  // Criar um novo coordenador
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, telefone, password } = req.body;

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const newCoordenador = await prisma.coordenador.create({
        data: {
          name,
          email,
          telefone,
          password: hashedPassword,
        },
      });

      res.status(201).json(newCoordenador);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Atualizar a senha de um coordenador existente
  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        res.status(400).json({ error: "Password is required" });
        return;
      }

      // Hash da nova senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedCoordenador = await prisma.coordenador.update({
        where: { id: Number(id) },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: "Password updated successfully", updatedCoordenador });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Marcar um coordenador como deletado (soft delete)
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedCoordenador = await prisma.coordenador.update({
        where: { id: Number(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      res.status(200).json({ message: "Coordenador deleted successfully", deletedCoordenador });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Método para verificar se o coordenador existe (esqueci minha senha)
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      
      if (!email) {
        res.status(400).json({ message: "Email é obrigatório" });
        return;
      }

      const coordenador = await prisma.coordenador.findUnique({
        where: { email },
      });

      if (!coordenador) {
        res.status(404).json({ message: "Coordenador não encontrado" });
        return;
      }

      res.status(200).json({ 
        message: "Coordenador encontrado",
        id: coordenador.id,
        email: coordenador.email 
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CoordenadorController;