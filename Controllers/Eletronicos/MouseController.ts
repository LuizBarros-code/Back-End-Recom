import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class MouseController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const mouses = await prisma.mouse.findMany();
      res.status(200).json(mouses);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const mouse = await prisma.mouse.findUnique({
        where: { id: Number(id) },
      });
      if (mouse) {
        res.status(200).json(mouse);
      } else {
        res.status(404).json({ error: 'Mouse not found' });
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
        tipoDeConexao,
        alunoid,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      if (!codigoDereferencia || !descricao || !status || !dataDeChegada || !marca || !modelo || !nome || !situacao || !tipoDeConexao) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newMouse = await prisma.mouse.create({
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
          tipoDeConexao,
          alunoid,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newMouse);
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
      const mouseAtual = await prisma.mouse.findUnique({ where: { id: Number(id) } });
      if (!mouseAtual) {
        res.status(404).json({ error: 'Mouse not found' });
        return;
      }
      if (status === undefined) status = mouseAtual.status;
      if (situacao === undefined) situacao = mouseAtual.situacao;

      const updatedMouse = await prisma.mouse.update({
        where: { id: Number(id) },
        data: { status, situacao },
      });
      res.status(200).json(updatedMouse);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.mouse.delete({
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
      const mouse = await prisma.mouse.findUnique({
        where: { id: Number(id) },
        include: { descarte: true }
      });
      if (!mouse || !mouse.descarte) {
        res.status(404).json({ error: 'Descarte não encontrado para este mouse' });
        return;
      }
      res.status(200).json(mouse.descarte);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}