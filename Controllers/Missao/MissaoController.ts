import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MissaoController {
  // Obter todas as missões
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const missoes = await prisma.missao.findMany({
        where: { deleted: false }, // Excluir missões marcadas como deletadas
      });
      res.status(200).json(missoes);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Obter uma missão por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const missao = await prisma.missao.findUnique({
        where: { id: Number(id) },
      });
      if (missao && !missao.deleted) {
        res.status(200).json(missao);
      } else {
        res.status(404).json({ error: "Missão not found or deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Criar uma nova missão
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao, dataLimite, usuarioId } = req.body;

      const newMissao = await prisma.missao.create({
        data: {
          titulo,
          descricao,
          dataLimite: new Date(dataLimite),
          usuarioId,
        },
      });

      res.status(201).json(newMissao);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Atualizar uma missão existente
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { titulo, descricao, dataLimite } = req.body;

      const updatedMissao = await prisma.missao.update({
        where: { id: Number(id) },
        data: {
          titulo,
          descricao,
          dataLimite: new Date(dataLimite),
        },
      });

      res.status(200).json(updatedMissao);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Marcar uma missão como deletada (soft delete)
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedMissao = await prisma.missao.update({
        where: { id: Number(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      res.status(200).json({ message: "Missão deleted successfully", deletedMissao });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default MissaoController;