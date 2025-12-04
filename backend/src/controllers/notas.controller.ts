import { Request, Response } from "express";
import * as NotasService from "../services/notas.service";

export const listarPorUsuario = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const notas = await NotasService.listarPorUsuario(userId);
    res.json(notas);
};

export const detalhe = async (req: Request, res: Response) => {
    const { disciplinaId, userId } = req.params;
    const nota = await NotasService.detalhe(disciplinaId, userId);
    res.json(nota);
};

export const criar = async (req: Request, res: Response) => {
    const nota = await NotasService.criar(req.body);
    res.status(201).json(nota);
};

export const atualizar = async (req: Request, res: Response) => {
    const nota = await NotasService.atualizar(req.params.id, req.body);
    res.json(nota);
};
