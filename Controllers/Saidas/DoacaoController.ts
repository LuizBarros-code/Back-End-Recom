import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DoacaoController {

  // Método para criar doação
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        name,
        codigoDeReferencias,
        descricao,
        justificativa,
        nomeOuEmpresa,
        contato,
        data,
        status,
        donatarioId,
        usuariofisicoId,
        usuariojuridicoId,
        teclados,
        hds,
        fontesDeAlimentacao,
        gabinetes,
        monitores,
        mouses,
        estabilizadores,
        impressoras,
        placasmae,
        notebooks,
        processadores
      } = request.body;

      console.log("Request Body:", request.body); // Verifique os dados recebidos

      // Verificar se os campos obrigatórios estão presentes
      if (!name || !codigoDeReferencias || !descricao || !justificativa || !nomeOuEmpresa || !contato || !data || !status) {
        response.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
        return;
      }

      // Converte os IDs para números (caso estejam como strings)
      const parsedDonatarioId = donatarioId ? parseInt(donatarioId, 10) : undefined;
      const parsedUsuariofisicoId = usuariofisicoId ? parseInt(usuariofisicoId, 10) : undefined;
      const parsedUsuariojuridicoId = usuariojuridicoId ? parseInt(usuariojuridicoId, 10) : undefined;

      const doacao = await prisma.doacao.create({
        data: {
          name,
          codigoDeReferencias,
          descricao,
          justificativa,
          nomeOuEmpresa,
          contato,
          data: new Date(data),
          status,
          donatarioId: parsedDonatarioId,
          usuariofisicoId: parsedUsuariofisicoId,
          usuariojuridicoId: parsedUsuariojuridicoId,
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
      response.status(201).json(doacao);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler doação
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const doacao = await prisma.doacao.findUnique({
        where: { id: parseInt(id) },
      });
      if (!doacao) {
        response.status(404).json({ message: "Doacao not found" });
        return;
      }
      response.json(doacao);
    } catch (error) {
      next(error);
    }
  };

  readAll = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const doacoes = await prisma.doacao.findMany();
      response.status(200).json(doacoes);
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar doação
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { name, codigoDeReferencias, descricao, justificativa, nomeOuEmpresa, contato, data, status } = request.body;
      const doacao = await prisma.doacao.update({
        where: { id: parseInt(id) },
        data: {
          name,
          codigoDeReferencias,
          descricao,
          justificativa,
          nomeOuEmpresa,
          contato,
          data: new Date(data),
          status,
        },
      });
      response.json(doacao);
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar doação
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      await prisma.doacao.delete({
        where: { id: parseInt(id) },
      });
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  // Retorna todos os teclados de uma doação
  async getTeclados(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const teclados = await prisma.teclado.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(teclados);
  }

  // Retorna todos os hds de uma doação
  async getHds(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const hds = await prisma.hd.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(hds);
  }

  // Retorna todos os estabilizadores de uma doação
  async getEstabilizadores(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const estabilizadores = await prisma.estabilizador.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(estabilizadores);
  }

  // Retorna todos os monitores de uma doação
  async getMonitores(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const monitores = await prisma.monitor.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(monitores);
  }

  // Retorna todos os mouses de uma doação
  async getMouses(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const mouses = await prisma.mouse.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(mouses);
  }

  // Retorna todos os gabinetes de uma doação
  async getGabinetes(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const gabinetes = await prisma.gabinete.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(gabinetes);
  }

  // Retorna todas as impressoras de uma doação
  async getImpressoras(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const impressoras = await prisma.impressora.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(impressoras);
  }

  // Retorna todas as placas mãe de uma doação
  async getPlacasMae(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const placasMae = await prisma.placamae.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(placasMae);
  }

  // Retorna todos os notebooks de uma doação
  async getNotebooks(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const notebooks = await prisma.notebook.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(notebooks);
  }

  // Retorna todos os processadores de uma doação
  async getProcessadores(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const processadores = await prisma.processador.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(processadores);
  }

  // Retorna todas as fontes de alimentação de uma doação
  async getFontesDeAlimentacao(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const fontes = await prisma.fontedealimentacao.findMany({ where: { doacaoId: Number(id) } });
    res.status(200).json(fontes);
  }
}

export default DoacaoController;