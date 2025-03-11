import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class HdController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const hds = await prisma.hd.findMany();
      res.status(200).json(hds);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const hd = await prisma.hd.findUnique({
        where: { id: Number(id) },
      });
      if (hd) {
        res.status(200).json(hd);
      } else {
        res.status(404).json({ error: 'HD not found' });
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
        capacidade,
        nome,
        imagem,
        situacao,
        tipoDeCapacidade,
        usuarioId,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !capacidade || !nome || !imagem || !situacao || !tipoDeCapacidade) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newHd = await prisma.hd.create({
        data: {
          codigoDereferencia,
          descricao,
          status,
          dataDeChegada: new Date(dataDeChegada),
          dataDeSaida: dataDeSaida ? new Date(dataDeSaida) : null,
          marca,
          modelo,
          capacidade,
          nome,
          imagem,
          situacao,
          tipoDeCapacidade,
          usuarioId,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newHd);
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
        capacidade,
        nome,
        imagem,
        situacao,
        tipoDeCapacidade,
        usuarioId,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !capacidade || !nome || !imagem || !situacao || !tipoDeCapacidade) {
        res.status(400).json({ error: 'Missing required fields' });
      }

      const updatedHd = await prisma.hd.update({
        where: { id: Number(id) },
        data: {
          codigoDereferencia,
          descricao,
          status,
          dataDeChegada: new Date(dataDeChegada),
          dataDeSaida: dataDeSaida ? new Date(dataDeSaida) : null,
          marca,
          modelo,
          capacidade,
          nome,
          imagem,
          situacao,
          tipoDeCapacidade,
          usuarioId,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(200).json(updatedHd);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.hd.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default HdController;