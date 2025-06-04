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
      let { status, situacao } = req.body;

      if (status === undefined && situacao === undefined) {
        res.status(400).json({ error: 'At least one field (status or situacao) must be provided' });
        return;
      }

      // Buscar o registro atual para preencher o campo não enviado
      const placaMaeAtual = await prisma.placamae.findUnique({ where: { id: Number(id) } });
      if (!placaMaeAtual) {
        res.status(404).json({ error: 'Placa Mãe not found' });
        return;
      }
      if (status === undefined) status = placaMaeAtual.status;
      if (situacao === undefined) situacao = placaMaeAtual.situacao;

      const updatedPlacaMae = await prisma.placamae.update({
        where: { id: Number(id) },
        data: { status, situacao },
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

  async getDescarte(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const placamae = await prisma.placamae.findUnique({
        where: { id: Number(id) },
        include: { descarte: true }
      });
      if (!placamae || !placamae.descarte) {
        res.status(404).json({ error: 'Descarte não encontrado para esta placa mãe' });
        return;
      }
      res.status(200).json(placamae.descarte);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default PlacaMaeController;