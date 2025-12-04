import prisma from '../prisma/client';

export const listarPorUsuario = (userId: string) => {
    return prisma.nota.findMany({
        where: { userId },
        include: { disciplina: true }
    });
};

export const detalhe = (disciplinaId: string, userId: string) => {
    return prisma.nota.findFirst({
        where: { disciplinaId, userId },
        include: { disciplina: true }
    });
};

export const criar = (data: any) => {
    return prisma.nota.create({ data });
};

export const atualizar = (id: string, data: any) => {
    return prisma.nota.update({
        where: { id },
        data
    });
};
