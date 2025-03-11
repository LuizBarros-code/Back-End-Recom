import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PlacaMaeController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const placasMae = await prisma.placamae.findMany();
      res.status(200).json(placasMae);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const placaMae = await prisma.placamae.findUnique({
        where: { id: Number(id) },
      });
      if (placaMae) {
        res.status(200).json(placaMae);
      } else {
        res.status(404).json({ error: 'Placa Mãe not found' });
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

      const newPlacaMae = await prisma.placamae.create({
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
      res.status(201).json(newPlacaMae);
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
        return;
      }

      const updatedPlacaMae = await prisma.placamae.update({
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
      res.status(200).json(updatedPlacaMae);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.placamae.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default PlacaMaeController;