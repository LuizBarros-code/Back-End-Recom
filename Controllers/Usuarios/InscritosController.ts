import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class InscritosController {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const inscritos = await prisma.inscrito.findMany();
            res.status(200).json(inscritos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar inscritos' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const inscrito = await prisma.inscrito.findUnique({
                where: { id: Number(id) },
            });
            if (inscrito) {
                res.status(200).json(inscrito);
            } else {
                res.status(404).json({ error: 'Inscrito não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar inscrito' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { name, email, dias, matricula, curso, periodo, bolsistaTipo } = req.body;
        try {
            const inscrito = await prisma.inscrito.create({
                data: {
                    name,
                    email,
                    dias,
                    matricula,
                    curso,
                    periodo,
                    bolsistaTipo,
                    status: 'Pendente', // Add a default or dynamic value for 'status'
                },
            });
            res.status(201).json(inscrito);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar inscrito' });
        }
    }

    public async updateStatus(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['Pendente', 'Aprovado', 'Reprovado'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ 
                error: 'Status inválido', 
                message: `O status deve ser um dos seguintes valores: ${validStatuses.join(', ')}` 
            });
            return;
        }

        try {
            const inscrito = await prisma.inscrito.update({
                where: { id: Number(id) },
                data: { status },
            });
            res.status(200).json(inscrito);
        } catch (error: any) {
            console.error('Erro ao atualizar status:', error);
            if (error.code === 'P2025') {
                res.status(404).json({ error: 'Inscrito não encontrado' });
            } else {
                res.status(500).json({ 
                    error: 'Erro ao atualizar status do inscrito',
                    details: error.message 
                });
            }
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.inscrito.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar inscrito' });
        }
    }
}