import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PessoaFisicaController {
  // Método para criar pessoa física
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, cpf, email, password, comprovanteDeBaixaRenda, telefone } = request.body;

      // Verificar se o email já existe
      const existingPessoaFisica = await prisma.pessoafisica.findUnique({
        where: { email },
      });

      if (existingPessoaFisica) {
        response.status(400).json({ message: "Email já está em uso" });
        return;
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const pessoaFisica = await prisma.pessoafisica.create({
        data: {
          tipo: "fisico",
          name,
          cpf,
          email,
          password: hashedPassword,
          comprovanteDeBaixaRenda: "",
          telefone,
        },
      });

      response.status(201).json(pessoaFisica);
    } catch (error) {
      next(error);
    }
  };

  // Método para listar todas as pessoas físicas
  getAll = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const pessoasFisicas = await prisma.pessoafisica.findMany({
        where: { deleted: false },
      });

      response.status(200).json(pessoasFisicas);
    } catch (error) {
      next(error);
    }
  };

  // Método para ler pessoa física por ID
  read = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { id: parseInt(id) },
      });

      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física não encontrada" });
        return;
      }

      response.status(200).json(pessoaFisica);
    } catch (error) {
      next(error);
    }
  };

  // Método para verificar credenciais usando CPF
  verifyCredentials = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { cpf, password } = request.body;

      // Verificar se o CPF e a senha foram fornecidos
      if (!cpf || !password) {
        response.status(400).json({ message: "CPF e senha são obrigatórios" });
        return;
      }

      // Buscar pessoa física pelo CPF
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { cpf },
      });

      // Verificar se a pessoa física existe e se a senha está correta
      if (!pessoaFisica || !(await bcrypt.compare(password, pessoaFisica.password))) {
        response.status(401).json({ message: "CPF ou senha inválidos" });
        return;
      }

      // Retornar sucesso sem a senha
      const { password: _, ...pessoaFisicaSemSenha } = pessoaFisica;
      response.json({ 
        message: "Credenciais verificadas com sucesso", 
        pessoaFisica: pessoaFisicaSemSenha 
      });
    } catch (error) {
      console.error("Erro ao verificar credenciais:", error);
      next(error);
    }
  };

  // Método para buscar pessoa física por email
  getByEmail = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = request.params;
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { email },
      });

      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física não encontrada" });
        return;
      }

      response.status(200).json(pessoaFisica);
    } catch (error) {
      next(error);
    }
  };

  // Método para buscar todas as pessoas físicas por nome
  getAllByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const names = await prisma.pessoafisica.findMany({
        select: { id: true, name: true },
      });

      res.status(200).json(names);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar nomes." });
    }
  };

  // Método para atualizar pessoa física
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;
      const { name, email, password, telefone } = request.body;

      // Buscar a pessoa física pelo ID
      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { id: parseInt(id) },
      });

      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física não encontrada" });
        return;
      }

      const dataToUpdate: any = {};
      if (name) dataToUpdate.name = name;
      if (email) dataToUpdate.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        dataToUpdate.password = hashedPassword;
      }
      if (telefone) dataToUpdate.telefone = telefone;

      // Handle file upload if present
      if (request.file) {
        // Verifica se é um arquivo válido (PDF, imagem, etc)
        const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedMimeTypes.includes(request.file.mimetype)) {
          response.status(400).json({ 
            message: "Tipo de arquivo não permitido. Apenas PDF e imagens (JPEG, PNG) são aceitos." 
          });
          return;
        }

        const fileUrl = `/uploads/${request.file.filename}`;
        dataToUpdate.comprovanteDeBaixaRenda = fileUrl;
      }

      // Atualizar a pessoa física
      const updatedPessoaFisica = await prisma.pessoafisica.update({
        where: { id: parseInt(id) },
        data: dataToUpdate,
      });

      // Remove a senha do objeto retornado
      const { password: _, ...pessoaFisicaSemSenha } = updatedPessoaFisica;

      response.status(200).json({ 
        message: "Pessoa Física atualizada com sucesso", 
        pessoaFisica: pessoaFisicaSemSenha 
      });
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar pessoa física
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = request.params;

      // Soft delete: marcar como deletado
      const deletedPessoaFisica = await prisma.pessoafisica.update({
        where: { id: parseInt(id) },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      response.status(200).json({ message: "Pessoa Física deletada com sucesso", deletedPessoaFisica });
    } catch (error) {
      next(error);
    }
  };

  // Método para verificar se a pessoa física existe (esqueci minha senha)
  forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { cpf } = request.body;
      
      if (!cpf) {
        response.status(400).json({ message: "CPF é obrigatório" });
        return;
      }

      const pessoaFisica = await prisma.pessoafisica.findUnique({
        where: { cpf },
      });

      if (!pessoaFisica) {
        response.status(404).json({ message: "Pessoa Física não encontrada" });
        return;
      }

      response.status(200).json({ 
        message: "Pessoa Física encontrada",
        id: pessoaFisica.id,
        email: pessoaFisica.email 
      });
    } catch (error) {
      next(error);
    }
  };
}