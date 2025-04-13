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

  // Atualizar um coordenador existente
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, telefone, password } = req.body;

      const dataToUpdate: any = { name, email, telefone };

      // Hash da senha, se fornecida
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        dataToUpdate.password = hashedPassword;
      }

      const updatedCoordenador = await prisma.coordenador.update({
        where: { id: Number(id) },
        data: dataToUpdate,
      });

      res.status(200).json(updatedCoordenador);
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
}

export default CoordenadorController;