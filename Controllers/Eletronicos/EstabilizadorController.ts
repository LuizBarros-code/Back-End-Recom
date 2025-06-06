import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class EstabilizadorController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const estabilizadores = await prisma.estabilizador.findMany();
      res.status(200).json(estabilizadores);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const estabilizador = await prisma.estabilizador.findUnique({
        where: { id: Number(id) },
      });
      if (estabilizador) {
        res.status(200).json(estabilizador);
      } else {
        res.status(404).json({ error: 'Estabilizador not found' });
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
        potencia,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      const newEstabilizador = await prisma.estabilizador.create({
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
          potencia,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newEstabilizador);
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
      const estabilizadorAtual = await prisma.estabilizador.findUnique({ where: { id: Number(id) } });
      if (!estabilizadorAtual) {
        res.status(404).json({ error: 'Estabilizador not found' });
        return;
      }
      if (status === undefined) status = estabilizadorAtual.status;
      if (situacao === undefined) situacao = estabilizadorAtual.situacao;

      const updatedEstabilizador = await prisma.estabilizador.update({
        where: { id: Number(id) },
        data: { status, situacao },
      });
      res.status(200).json(updatedEstabilizador);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.estabilizador.delete({
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
      const estabilizador = await prisma.estabilizador.findUnique({
        where: { id: Number(id) },
        include: { descarte: true }
      });
      if (!estabilizador || !estabilizador.descarte) {
        res.status(404).json({ error: 'Descarte não encontrado para este estabilizador' });
        return;
      }
      res.status(200).json(estabilizador.descarte);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default EstabilizadorController;