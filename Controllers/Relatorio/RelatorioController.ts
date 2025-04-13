import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RelatorioController {
  // Obter todos os relatórios
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const relatorios = await prisma.relatorio.findMany({
        where: { deleted: false }, // Excluir relatórios marcados como deletados
      });
      res.status(200).json(relatorios);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Obter um relatório por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const relatorio = await prisma.relatorio.findUnique({
        where: { id: Number(id) },
      });
      if (relatorio && !relatorio.deleted) {
        res.status(200).json(relatorio);
      } else {
        res.status(404).json({ error: "Relatório not found or deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Criar um novo relatório
  async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        resumo,
        periodo,
        atividades,
        objetivos,
        desafios,
        proximosPassos,
        feedback,
        usuarioId,
      } = req.body;

      const newRelatorio = await prisma.relatorio.create({
        data: {
          name,
          resumo,
          periodo,
          atividades,
          objetivos,
          desafios,
          proximosPassos,
          feedback,
          usuarioId,
        },
      });

      res.status(201).json(newRelatorio);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Atualizar um relatório existente
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        name,
        resumo,
        periodo,
        atividades,
        objetivos,
        desafios,
        proximosPassos,
        feedback,
        aprovado,
      } = req.body;

      const updatedRelatorio = await prisma.relatorio.update({
        where: { id: Number(id) },
        data: {
          name,
          resumo,
          periodo,
          atividades,
          objetivos,
          desafios,
          proximosPassos,
          feedback,
          aprovado,
        },
      });

      res.status(200).json(updatedRelatorio);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Marcar um relatório como deletado (soft delete)
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedRelatorio = await prisma.relatorio.update({
        where: { id: Number(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      res.status(200).json({ message: "Relatório deleted successfully", deletedRelatorio });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default RelatorioController;