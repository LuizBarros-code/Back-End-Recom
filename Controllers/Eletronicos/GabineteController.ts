import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GabineteController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const gabinetes = await prisma.gabinete.findMany();
      res.status(200).json(gabinetes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gabinete = await prisma.gabinete.findUnique({
        where: { id: Number(id) },
      });
      if (gabinete) {
        res.status(200).json(gabinete);
      } else {
        res.status(404).json({ error: 'Gabinete not found' });
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
        imagem,
        situacao,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newGabinete = await prisma.gabinete.create({
        data: {
          codigoDereferencia,
          descricao,
          status,
          dataDeChegada: new Date(dataDeChegada),
          dataDeSaida: dataDeSaida ? new Date(dataDeSaida) : null,
          marca,
          modelo,
          nome,
          imagem,
          situacao,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newGabinete);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        codigoDereferencia,
        descricao,
        status,
        dataDeChegada,
        dataDeSaida,
        marca,
        modelo,
        nome,
        imagem,
        situacao,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao) {
        res.status(400).json({ error: 'Missing required fields' });
      }

      const updatedGabinete = await prisma.gabinete.update({
        where: { id: Number(id) },
        data: {
          codigoDereferencia,
          descricao,
          status,
          dataDeChegada: new Date(dataDeChegada),
          dataDeSaida: dataDeSaida ? new Date(dataDeSaida) : null,
          marca,
          modelo,
          nome,
          imagem,
          situacao,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(200).json(updatedGabinete);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.gabinete.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default GabineteController;