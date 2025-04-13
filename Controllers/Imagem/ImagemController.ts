import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ImagemController {
  // Obter todas as imagens
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const imagens = await prisma.imagem.findMany({
        where: { deleted: false }, // Excluir imagens marcadas como deletadas
        include: {
          teclado: true,
          hd: true,
          fontedealimentacao: true,
          gabinete: true,
          monitor: true,
          mouse: true,
          estabilizador: true,
          impressora: true,
          placamae: true,
          notebook: true,
          processador: true,
        },
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
        include: {
          teclado: true,
          hd: true,
          fontedealimentacao: true,
          gabinete: true,
          monitor: true,
          mouse: true,
          estabilizador: true,
          impressora: true,
          placamae: true,
          notebook: true,
          processador: true,
        },
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
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const {
        tecladoId,
        hdId,
        fontedealimentacaoId,
        gabineteId,
        monitorId,
        mouseId,
        estabilizadorId,
        impressoraId,
        placamaeId,
        notebookId,
        processadorId,
      } = req.body;

      const fileUrl = `/uploads/${req.file.filename}`; // Caminho relativo do arquivo

      const newImagem = await prisma.imagem.create({
        data: {
          url: fileUrl,
          tecladoId: tecladoId ? Number(tecladoId) : null,
          hdId: hdId ? Number(hdId) : null,
          fontedealimentacaoId: fontedealimentacaoId ? Number(fontedealimentacaoId) : null,
          gabineteId: gabineteId ? Number(gabineteId) : null,
          monitorId: monitorId ? Number(monitorId) : null,
          mouseId: mouseId ? Number(mouseId) : null,
          estabilizadorId: estabilizadorId ? Number(estabilizadorId) : null,
          impressoraId: impressoraId ? Number(impressoraId) : null,
          placamaeId: placamaeId ? Number(placamaeId) : null,
          notebookId: notebookId ? Number(notebookId) : null,
          processadorId: processadorId ? Number(processadorId) : null,
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
      const {
        url,
        tecladoId,
        hdId,
        fontedealimentacaoId,
        gabineteId,
        monitorId,
        mouseId,
        estabilizadorId,
        impressoraId,
        placamaeId,
        notebookId,
        processadorId,
      } = req.body;

      const updatedImagem = await prisma.imagem.update({
        where: { id: Number(id) },
        data: {
          url,
          tecladoId: tecladoId ? Number(tecladoId) : null,
          hdId: hdId ? Number(hdId) : null,
          fontedealimentacaoId: fontedealimentacaoId ? Number(fontedealimentacaoId) : null,
          gabineteId: gabineteId ? Number(gabineteId) : null,
          monitorId: monitorId ? Number(monitorId) : null,
          mouseId: mouseId ? Number(mouseId) : null,
          estabilizadorId: estabilizadorId ? Number(estabilizadorId) : null,
          impressoraId: impressoraId ? Number(impressoraId) : null,
          placamaeId: placamaeId ? Number(placamaeId) : null,
          notebookId: notebookId ? Number(notebookId) : null,
          processadorId: processadorId ? Number(processadorId) : null,
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