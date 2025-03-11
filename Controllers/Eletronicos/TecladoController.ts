import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TecladoController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const teclados = await prisma.teclado.findMany();
      res.status(200).json(teclados);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const teclado = await prisma.teclado.findUnique({
        where: { id: Number(id) },
      });
      if (teclado) {
        res.status(200).json(teclado);
      } else {
        res.status(404).json({ error: 'Teclado not found' });
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
        tipoDeConexao,
        usuarioId,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao || !tipoDeConexao) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const teclado = await prisma.teclado.create({
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
          tipoDeConexao,
          usuarioId,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(teclado);
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
        tipoDeConexao,
        usuarioId,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao || !tipoDeConexao) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const teclado = await prisma.teclado.update({
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
          tipoDeConexao,
          usuarioId,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(200).json(teclado);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.teclado.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default TecladoController;