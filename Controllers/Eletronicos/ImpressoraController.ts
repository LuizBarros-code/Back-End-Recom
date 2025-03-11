import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ImpressoraController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const impressoras = await prisma.impressora.findMany();
      res.status(200).json(impressoras);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const impressora = await prisma.impressora.findUnique({
        where: { id: Number(id) },
      });
      if (impressora) {
        res.status(200).json(impressora);
      } else {
        res.status(404).json({ error: 'Impressora not found' });
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
        tipoDeTinta,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao || !tipoDeTinta) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newImpressora = await prisma.impressora.create({
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
          tipoDeTinta,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newImpressora);
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
        tipoDeTinta,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao || !tipoDeTinta) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const updatedImpressora = await prisma.impressora.update({
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
          tipoDeTinta,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(200).json(updatedImpressora);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.impressora.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default ImpressoraController;