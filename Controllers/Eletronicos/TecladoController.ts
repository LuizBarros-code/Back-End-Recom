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
        situacao,
        tipoDeConexao,
        usuarioId,
        modificadorid,
        descarteId,
        doacaoId
      } = req.body;

      const newTeclado = await prisma.teclado.create({
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
          usuarioId,
          modificadorid,
          descarteId,
          doacaoId
        },
      });
      res.status(201).json(newTeclado);
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
      const tecladoAtual = await prisma.teclado.findUnique({ where: { id: Number(id) } });
      if (!tecladoAtual) {
        res.status(404).json({ error: 'Teclado not found' });
        return;
      }
      if (status === undefined) status = tecladoAtual.status;
      if (situacao === undefined) situacao = tecladoAtual.situacao;

      const updatedTeclado = await prisma.teclado.update({
        where: { id: Number(id) },
        data: { status, situacao },
      });
      res.status(200).json(updatedTeclado);
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

  async getDescarte(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const teclado = await prisma.teclado.findUnique({
        where: { id: Number(id) },
        include: { descarte: true }
      });
      if (!teclado || !teclado.descarte) {
        res.status(404).json({ error: 'Descarte não encontrado para este teclado' });
        return;
      }
      res.status(200).json(teclado.descarte);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default TecladoController;