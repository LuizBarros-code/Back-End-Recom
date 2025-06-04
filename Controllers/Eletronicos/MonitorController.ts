import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MonitorController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const monitores = await prisma.monitor.findMany();
      res.status(200).json(monitores);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const monitor = await prisma.monitor.findUnique({
        where: { id: Number(id) },
      });
      if (monitor) {
        res.status(200).json(monitor);
      } else {
        res.status(404).json({ error: 'Monitor not found' });
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
        polegadas,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      const newMonitor = await prisma.monitor.create({
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
          polegadas,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newMonitor);
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
      const monitorAtual = await prisma.monitor.findUnique({ where: { id: Number(id) } });
      if (!monitorAtual) {
        res.status(404).json({ error: 'Monitor not found' });
        return;
      }
      if (status === undefined) status = monitorAtual.status;
      if (situacao === undefined) situacao = monitorAtual.situacao;

      const updatedMonitor = await prisma.monitor.update({
        where: { id: Number(id) },
        data: { status, situacao },
      });
      res.status(200).json(updatedMonitor);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.monitor.delete({
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
      const monitor = await prisma.monitor.findUnique({
        where: { id: Number(id) },
        include: { descarte: true }
      });
      if (!monitor || !monitor.descarte) {
        res.status(404).json({ error: 'Descarte não encontrado para este monitor' });
        return;
      }
      res.status(200).json(monitor.descarte);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default MonitorController;