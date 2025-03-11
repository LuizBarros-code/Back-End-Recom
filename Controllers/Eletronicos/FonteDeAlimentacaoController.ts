import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FonteDeAlimentacaoController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const fontesDeAlimentacao = await prisma.fontedealimentacao.findMany();
      res.status(200).json(fontesDeAlimentacao);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const fonteDeAlimentacao = await prisma.fontedealimentacao.findUnique({
        where: { id: Number(id) },
      });
      if (fonteDeAlimentacao) {
        res.status(200).json(fonteDeAlimentacao);
      } else {
        res.status(404).json({ error: 'Fonte de Alimentação not found' });
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
        potencia,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao || !potencia) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newFonteDeAlimentacao = await prisma.fontedealimentacao.create({
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
          potencia,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newFonteDeAlimentacao);
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
        potencia,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !imagem || !situacao || !potencia) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const updatedFonteDeAlimentacao = await prisma.fontedealimentacao.update({
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
          potencia,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(200).json(updatedFonteDeAlimentacao);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.fontedealimentacao.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default FonteDeAlimentacaoController;