import prisma from '../prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const detalhe = (id: string) => {
    return prisma.boleto.findUnique({ where: { id } });
};

export const criar = (data: any) => {
    return prisma.boleto.create({ data });
};

export const atualizar = (id: string, status: string) => {
    return prisma.boleto.update({
        where: { id },
        data: { status }
    });
};

export const remover = (id: string) => {
    return prisma.boleto.delete({ where: { id } });
};

import { v4 as uuidv4 } from 'uuid';

export interface Boleto {
  id: string;
  userId: string;
  vencimento: string;
  valor: number;
  status: 'Pago' | 'Pendente';
}

// Banco de dados simulado
const boletosDB: Boleto[] = [];

// Gera boletos automaticamente para um usuário
export const gerarBoletosAutomaticos = (userId: string, qtd: number = 4): Boleto[] => {
  const boletos: Boleto[] = [];

  for (let i = 0; i < qtd; i++) {
    const boleto: Boleto = {
      id: uuidv4(),
      userId,
      vencimento: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias de diferença
      valor: 850,
      status: i === 0 ? 'Pendente' : 'Pago',
    };
    boletos.push(boleto);
    boletosDB.push(boleto);
  }

  return boletos;
};

export const listarPorUsuario = (userId: string): Boleto[] => {
  // Se não houver boletos, gera automaticamente
  const existentes = boletosDB.filter(b => b.userId === userId);
  if (existentes.length === 0) {
    return gerarBoletosAutomaticos(userId);
  }
  return existentes;
};
