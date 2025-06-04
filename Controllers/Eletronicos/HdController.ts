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
        nome,
        situacao,
        capacidade,
        tipoDeCapacidade,
        usuarioId,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      const newHd = await prisma.hd.create({
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
          capacidade,
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
      let { status, situacao } = req.body;

      if (status === undefined && situacao === undefined) {
        res.status(400).json({ error: 'At least one field (status or situacao) must be provided' });
        return;
      }

      // Buscar o registro atual para preencher o campo não enviado
      const hdAtual = await prisma.hd.findUnique({ where: { id: Number(id) } });
      if (!hdAtual) {
        res.status(404).json({ error: 'HD not found' });
        return;
      }
      if (status === undefined) status = hdAtual.status;
      if (situacao === undefined) situacao = hdAtual.situacao;

      const updatedHd = await prisma.hd.update({
        where: { id: Number(id) },
        data: { status, situacao },
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

  async getDescarte(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const hd = await prisma.hd.findUnique({
        where: { id: Number(id) },
        include: { descarte: true }
      });
      if (!hd || !hd.descarte) {
        res.status(404).json({ error: 'Descarte não encontrado para este hd' });
        return;
      }
      res.status(200).json(hd.descarte);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default HdController;