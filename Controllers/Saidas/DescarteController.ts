import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DescarteController {
  // Método para criar descarte
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, codigoDeReferencias, descricao, data, usuarioId, teclados, hds, fontesDeAlimentacao, gabinetes, monitores, mouses, estabilizadores, impressoras, placasmae, notebooks, processadores } = request.body;
      const descarte = await prisma.descarte.create({
        data: {
          name,
          codigoDeReferencias,
          descricao,
          data: new Date(data),
          usuarioId,
          teclados: {
            connect: teclados.map((id: number) => ({ id }))
          },
          hds: {
            connect: hds.map((id: number) => ({ id }))
          },
          fontesDeAlimentacao: {
            connect: fontesDeAlimentacao.map((id: number) => ({ id }))
          },
          gabinetes: {
            connect: gabinetes.map((id: number) => ({ id }))
          },
          monitores: {
            connect: monitores.map((id: number) => ({ id }))
          },
          mouses: {
            connect: mouses.map((id: number) => ({ id }))
          },
          estabilizadores: {
            connect: estabilizadores.map((id: number) => ({ id }))
          },
          impressoras: {
            connect: impressoras.map((id: number) => ({ id }))
          },
          placasmae: {
            connect: placasmae.map((id: number) => ({ id }))
          },
          notebooks: {
            connect: notebooks.map((id: number) => ({ id }))
          },
          processadores: {
            connect: processadores.map((id: number) => ({ id }))
          }
        },
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
}
export default DescarteController;