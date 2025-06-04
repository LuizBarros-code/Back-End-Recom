import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";

// Instância do Prisma
const prisma = new PrismaClient();

// Configuração do multer para fazer o upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Defina o diretório onde as imagens serão salvas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  },
});

const upload = multer({ storage: storage }).single("image"); // O campo de upload será chamado "image"

export class ImagemController {
  // Obter todas as imagens
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const imagens = await prisma.imagem.findMany({
        where: { deleted: false }, // Excluir imagens marcadas como deletadas
        include: {
          teclado: true,
          hd: true,
          fontedealimentacao: true,
          gabinete: true,
          monitor: true,
          mouse: true,
          estabilizador: true,
          impressora: true,
          placamae: true,
          notebook: true,
          processador: true,
        },
      });
      res.status(200).json(imagens);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Obter uma imagem por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findUnique({
        where: { id: Number(id) },
        include: {
          teclado: true,
          hd: true,
          fontedealimentacao: true,
          gabinete: true,
          monitor: true,
          mouse: true,
          estabilizador: true,
          impressora: true,
          placamae: true,
          notebook: true,
          processador: true,
        },
      });
      if (imagem && !imagem.deleted) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found or deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um estabilizador
  async getByEstabilizadorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { estabilizadorId: Number(id), deleted: false },
        include: {
          estabilizador: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um impressora
  async getByImpressoraId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { impressoraId: Number(id), deleted: false },
        include: {
          impressora: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um notebook
  async getByNotebookId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { notebookId: Number(id), deleted: false },
        include: {
          notebook: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um processador
  async getByProcessadorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { processadorId: Number(id), deleted: false },
        include: {
          processador: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um teclado
  async getByTecladoId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { tecladoId: Number(id), deleted: false },
        include: {
          teclado: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um gabinete
  async getByGabineteId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { gabineteId: Number(id), deleted: false },
        include: {
          gabinete: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um hd
  async getByHdId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { hdId: Number(id), deleted: false },
        include: {
          hd: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um monitor
  async getByMonitorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { monitorId: Number(id), deleted: false },
        include: {
          monitor: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de um mouse
  async getByMouseId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { mouseId: Number(id), deleted: false },
        include: {
          mouse: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de uma placa mae
  async getByPlacaMaeId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { placamaeId: Number(id), deleted: false },
        include: {
          placamae: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //metodo para puxar imagem de uma fonte de alimentacao
  async getByFonteDeAlimentacaoId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagem = await prisma.imagem.findMany({
        where: { fontedealimentacaoId: Number(id), deleted: false },
        include: {
          fontedealimentacao: true,
        },
      });
      if (imagem) {
        res.status(200).json(imagem);
      } else {
        res.status(404).json({ error: "Imagem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }


  // Criar uma nova imagem
async create(req: Request, res: Response): Promise<void> {
  try {
    console.log("Arquivo recebido:", req.file);

    if (!req.file) {
      res.status(400).json({ error: "Nenhum arquivo enviado" });
      return;
    }

    const {
      tecladoId,
      hdId,
      fontedealimentacaoId,
      gabineteId,
      monitorId,
      mouseId,
      estabilizadorId,
      impressoraId,
      placamaeId,
      notebookId,
      processadorId,
    } = req.body;

    const fileUrl = `/uploads/${req.file.filename}`; // Caminho relativo do arquivo

    const newImagem = await prisma.imagem.create({
      data: {
        url: fileUrl,
        tecladoId: tecladoId ? Number(tecladoId) : null,
        hdId: hdId ? Number(hdId) : null,
        fontedealimentacaoId: fontedealimentacaoId ? Number(fontedealimentacaoId) : null,
        gabineteId: gabineteId ? Number(gabineteId) : null,
        monitorId: monitorId ? Number(monitorId) : null,
        mouseId: mouseId ? Number(mouseId) : null,
        estabilizadorId: estabilizadorId ? Number(estabilizadorId) : null,
        impressoraId: impressoraId ? Number(impressoraId) : null,
        placamaeId: placamaeId ? Number(placamaeId) : null,
        notebookId: notebookId ? Number(notebookId) : null,
        processadorId: processadorId ? Number(processadorId) : null,
      },
    });

    res.status(201).json({ message: "Imagem criada com sucesso", newImagem });
  } catch (error) {
    console.error("Erro ao salvar imagem:", error);
    res.status(500).json({ error: "Erro interno ao salvar imagem" });
  }
}

  // Atualizar uma imagem existente
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        url,
        tecladoId,
        hdId,
        fontedealimentacaoId,
        gabineteId,
        monitorId,
        mouseId,
        estabilizadorId,
        impressoraId,
        placamaeId,
        notebookId,
        processadorId,
      } = req.body;

      const updatedImagem = await prisma.imagem.update({
        where: { id: Number(id) },
        data: {
          url,
          tecladoId: tecladoId ? Number(tecladoId) : null,
          hdId: hdId ? Number(hdId) : null,
          fontedealimentacaoId: fontedealimentacaoId ? Number(fontedealimentacaoId) : null,
          gabineteId: gabineteId ? Number(gabineteId) : null,
          monitorId: monitorId ? Number(monitorId) : null,
          mouseId: mouseId ? Number(mouseId) : null,
          estabilizadorId: estabilizadorId ? Number(estabilizadorId) : null,
          impressoraId: impressoraId ? Number(impressoraId) : null,
          placamaeId: placamaeId ? Number(placamaeId) : null,
          notebookId: notebookId ? Number(notebookId) : null,
          processadorId: processadorId ? Number(processadorId) : null,
        },
      });

      res.status(200).json(updatedImagem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Marcar uma imagem como deletada (soft delete)
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedImagem = await prisma.imagem.update({
        where: { id: Number(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      res.status(200).json({ message: "Imagem deleted successfully", deletedImagem });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ImagemController;
