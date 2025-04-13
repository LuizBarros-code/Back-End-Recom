import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ImagemController {
  // Obter todas as imagens
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const imagens = await prisma.imagem.findMany({
        where: { deleted: false }, // Excluir imagens marcadas como deletadas
      });
      res.status(200).json(imagens);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Obter uma imagem por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findUnique({
        where: { id: Number(id) },
      });
      if (imagem && !imagem.deleted) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found or deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Criar uma nova imagem
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { url, tecladoId, hdId } = req.body;

      const newImagem = await prisma.imagem.create({
        data: {
          url,
          tecladoId,
          hdId,
        },
      });

      res.status(201).json(newImagem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Atualizar uma imagem existente
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { url, tecladoId, hdId } = req.body;

      const updatedImagem = await prisma.imagem.update({
        where: { id: Number(id) },
        data: {
          url,
          tecladoId,
          hdId,
        },
      });

      res.status(200).json(updatedImagem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Marcar uma imagem como deletada (soft delete)
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedImagem = await prisma.imagem.update({
        where: { id: Number(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      res.status(200).json({ message: "Imagem deleted successfully", deletedImagem });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ImagemController;