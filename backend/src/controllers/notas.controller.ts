import { Request, Response } from "express";
import * as NotasService from "../services/notas.service";
import { sendEmailToResponsible } from "../services/email.service"; 
import prisma from "@/prisma/client";

export const listarPorUsuario = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const notas = await NotasService.listarPorUsuario(userId);
        return res.json(notas);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

export const detalhe = async (req: Request, res: Response) => {
    try {
        const { disciplinaId, userId } = req.params;
        const nota = await NotasService.detalhe(disciplinaId, userId);
        return res.json(nota);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

export const criar = async (req: Request, res: Response) => {
    try {
        const nota = await NotasService.criar(req.body);
        return res.status(201).json(nota);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

export const atualizar = async (req: Request, res: Response) => {
    try {
        const nota = await NotasService.atualizar(req.params.id, req.body);
        return res.json(nota);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

export const criarPorNome = async (req: Request, res: Response) => {
    try {
        const { alunoNome, disciplinaNome, nota1, nota2, faltas, situacao } = req.body;

        const nota = await NotasService.criarPorNome({ alunoNome, disciplinaNome, nota1, nota2, faltas, situacao });

        // Envia email
        await sendEmailToResponsible({
            email: nota.user.email,
            aluno: nota.user.name,
            disciplina: nota.disciplina.nome,
            nota1: nota.nota1,
            nota2: nota.nota2,
            notaFinal: nota.notaFinal,
            situacao: nota.situacao
        });

        return res.status(201).json(nota);

    } catch (err: any) {
        console.error(err);
        return res.status(err.status || 500).json({ error: err.message });
    }
};

export const listarAlunos = async (req: Request, res: Response) => {
  const { search } = req.query;

  try {
    const alunos = await prisma.user.findMany({
      where: search ? { name: { contains: String(search), mode: "insensitive" } } : {},
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    return res.json(alunos);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
