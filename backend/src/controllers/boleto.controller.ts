import { Request, Response } from "express";
import * as BoletosService from "../services/boleto.service";
import { Boleto, Banco } from 'boleto-brasil';

export const listarPorUsuario = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const boletos = await BoletosService.listarPorUsuario(userId);
    res.json(boletos);
};

export const detalhe = async (req: Request, res: Response) => {
    const boleto = await BoletosService.detalhe(req.params.id);
    if (!boleto) return res.status(404).json({ message: "Boleto não encontrado" });
    res.json(boleto);
};

export const criar = async (req: Request, res: Response) => {
    const boleto = await BoletosService.criar(req.body);
    res.status(201).json(boleto);
};

export const atualizarStatus = async (req: Request, res: Response) => {
    const boleto = await BoletosService.atualizar(req.params.id, req.body.status);
    res.json(boleto);
};

export const remover = async (req: Request, res: Response) => {
    await BoletosService.remover(req.params.id);
    res.status(204).send();
};

export const gerarBoleto = (userId: string, valor: number, vencimento: string) => {
  const boleto = {
    banco: Banco.Bradesco,
    valor,
    vencimento: new Date(vencimento),
    emissao: new Date(),
    nossoNumero: String(Math.floor(Math.random() * 1000000)),
    numeroDocumento: String(Math.floor(Math.random() * 10000)),
    cedente: 'Minha Empresa LTDA',
    agencia: '1234',
    conta: '56789',
    carteira: '09',
    sacado: {
      nome: `Usuário ${userId}`,
      cpfCnpj: '00000000000',
      endereco: 'Rua Exemplo, 123',
    },
  };

  // Apenas para simular, gera HTML
  return `<html>
    <body>
      <h1>Boleto Simulado</h1>
      <p>Usuário: ${boleto.sacado.nome}</p>
      <p>Valor: R$ ${boleto.valor}</p>
      <p>Vencimento: ${boleto.vencimento.toLocaleDateString()}</p>
      <p>Nosso Número: ${boleto.nossoNumero}</p>
    </body>
  </html>`;
};
