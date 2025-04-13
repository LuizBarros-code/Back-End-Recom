import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DataController {
    // Obter todos os registros
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const data = await prisma.data.findMany({
                where: { deleted: false }, // Excluir registros marcados como deletados
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Obter um registro por ID
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = await prisma.data.findUnique({
                where: { id: Number(id) },
            });
            if (data && !data.deleted) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ error: 'Data not found or deleted' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Criar um novo registro
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { data, descricao, disponibilidade } = req.body;

            const newData = await prisma.data.create({
                data: {
                    data: new Date(data),
                    disponibilidade,
                },
            });

            res.status(201).json(newData);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Atualizar um registro existente
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { data, disponibilidade } = req.body;

            const updatedData = await prisma.data.update({
                where: { id: Number(id) },
                data: {
                    data: data ? new Date(data) : undefined,
                    disponibilidade,
                },
            });

            res.status(200).json(updatedData);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Marcar um registro como deletado (soft delete)
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const deletedData = await prisma.data.update({
                where: { id: Number(id) },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });

            res.status(200).json({ message: 'Data deleted successfully', deletedData });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default DataController;