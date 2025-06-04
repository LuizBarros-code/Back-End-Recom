import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class NotebookController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const notebooks = await prisma.notebook.findMany();
      res.status(200).json(notebooks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const notebook = await prisma.notebook.findUnique({
        where: { id: Number(id) },
      });
      if (notebook) {
        res.status(200).json(notebook);
      } else {
        res.status(404).json({ error: 'Notebook not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        codigoDereferencia,
        descricao,
        status,
        dataDeChegada,
        dataDeSaida,
        marca,
        modelo,
        nome,
        situacao,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !situacao) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newNotebook = await prisma.notebook.create({
        data: {
          codigoDereferencia,
          descricao,
          status,
          dataDeChegada: new Date(dataDeChegada),
          dataDeSaida: dataDeSaida ? new Date(dataDeSaida) : null,
          marca,
          modelo,
          nome,
          situacao,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newNotebook);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      let { status, situacao } = req.body;

      if (status === undefined && situacao === undefined) {
        res.status(400).json({ error: 'At least one field (status or situacao) must be provided' });
        return;
      }

      // Buscar o registro atual para preencher o campo não enviado
      const notebookAtual = await prisma.notebook.findUnique({ where: { id: Number(id) } });
      if (!notebookAtual) {
        res.status(404).json({ error: 'Notebook not found' });
        return;
      }
      if (status === undefined) status = notebookAtual.status;
      if (situacao === undefined) situacao = notebookAtual.situacao;

      const updatedNotebook = await prisma.notebook.update({
        where: { id: Number(id) },
        data: { status, situacao },
      });
      res.status(200).json(updatedNotebook);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.notebook.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getDescarte(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const notebook = await prisma.notebook.findUnique({
        where: { id: Number(id) },
        include: { descarte: true }
      });
      if (!notebook || !notebook.descarte) {
        res.status(404).json({ error: 'Descarte não encontrado para este notebook' });
        return;
      }
      res.status(200).json(notebook.descarte);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default NotebookController;