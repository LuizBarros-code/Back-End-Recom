import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DescarteController {
  // Método para criar descarte
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, codigoDeReferencias, descricao, data, usuarioId, teclados, hds, fontesDeAlimentacao, gabinetes, monitores, mouses, estabilizadores, impressoras, placasmae, notebooks, processadores } = request.body;
      const dataToCreate: any = {
        name,
        codigoDeReferencias,
        descricao,
        data: new Date(data),
        usuarioId,
      };
      if (teclados) dataToCreate.teclados = { connect: teclados.map((id: number) => ({ id })) };
      if (hds) dataToCreate.hds = { connect: hds.map((id: number) => ({ id })) };
      if (fontesDeAlimentacao) dataToCreate.fontesDeAlimentacao = { connect: fontesDeAlimentacao.map((id: number) => ({ id })) };
      if (gabinetes) dataToCreate.gabinetes = { connect: gabinetes.map((id: number) => ({ id })) };
      if (monitores) dataToCreate.monitores = { connect: monitores.map((id: number) => ({ id })) };
      if (mouses) dataToCreate.mouses = { connect: mouses.map((id: number) => ({ id })) };
      if (estabilizadores) dataToCreate.estabilizadores = { connect: estabilizadores.map((id: number) => ({ id })) };
      if (impressoras) dataToCreate.impressoras = { connect: impressoras.map((id: number) => ({ id })) };
      if (placasmae) dataToCreate.placasmae = { connect: placasmae.map((id: number) => ({ id })) };
      if (notebooks) dataToCreate.notebooks = { connect: notebooks.map((id: number) => ({ id })) };
      if (processadores) dataToCreate.processadores = { connect: processadores.map((id: number) => ({ id })) };
      const descarte = await prisma.descarte.create({
        data: dataToCreate,
      });
      response.status(201).json(descarte);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler descarte
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const descarte = await prisma.descarte.findUnique({
        where: { id: parseInt(id) },
      });
      if (!descarte) {
        response.status(404).json({ message: "Descarte not found" });
        return;
      }
      response.json(descarte);
    } catch (error) {
      next(error);
    }
  };

  // Método para listar descartes
  list = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const descartes = await prisma.descarte.findMany({
        where: { deleted: false },
      });
      response.json(descartes);
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar descarte
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { name, codigoDeReferencias, descricao, data } = request.body;
      const descarte = await prisma.descarte.update({
        where: { id: parseInt(id) },
        data: {
          name,
          codigoDeReferencias,
          descricao,
          data: new Date(data),
        },
      });
      response.json(descarte);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar descarte
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.descarte.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  // Retorna todos os teclados de um descarte
  async getTeclados(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const teclados = await prisma.teclado.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(teclados);
  }

  // Retorna todos os hds de um descarte
  async getHds(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const hds = await prisma.hd.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(hds);
  }

  // Retorna todos os estabilizadores de um descarte
  async getEstabilizadores(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const estabilizadores = await prisma.estabilizador.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(estabilizadores);
  }

  // Retorna todos os monitores de um descarte
  async getMonitores(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const monitores = await prisma.monitor.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(monitores);
  }

  // Retorna todos os mouses de um descarte
  async getMouses(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const mouses = await prisma.mouse.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(mouses);
  }

  // Retorna todos os gabinetes de um descarte
  async getGabinetes(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const gabinetes = await prisma.gabinete.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(gabinetes);
  }

  // Retorna todas as impressoras de um descarte
  async getImpressoras(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const impressoras = await prisma.impressora.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(impressoras);
  }

  // Retorna todas as placas mãe de um descarte
  async getPlacasMae(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const placasMae = await prisma.placamae.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(placasMae);
  }

  // Retorna todos os notebooks de um descarte
  async getNotebooks(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const notebooks = await prisma.notebook.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(notebooks);
  }

  // Retorna todos os processadores de um descarte
  async getProcessadores(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const processadores = await prisma.processador.findMany({ where: { descarteId: Number(id) } });
    res.status(200).json(processadores);
  }
}

export default DescarteController;