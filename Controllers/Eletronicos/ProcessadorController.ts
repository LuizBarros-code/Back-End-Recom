import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProcessadorController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const processadores = await prisma.processador.findMany();
      res.status(200).json(processadores);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const processador = await prisma.processador.findUnique({
        where: { id: Number(id) },
      });
      if (processador) {
        res.status(200).json(processador);
      } else {
        res.status(404).json({ error: 'Processador not found' });
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

      const newProcessador = await prisma.processador.create({
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
      res.status(201).json(newProcessador);
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

      const updatedProcessador = await prisma.processador.update({
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
      res.status(200).json(updatedProcessador);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.processador.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default ProcessadorController;