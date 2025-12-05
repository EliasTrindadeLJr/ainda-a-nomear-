import prisma from '../prisma/client';

export const listarPorUsuario = (userId: string) => {
    return prisma.nota.findMany({
        where: { userId },
        include: {
            disciplina: true,
            user: true  // ⚡ Inclui o aluno
        }
    });
};

export const detalhe = (disciplinaId: string, userId: string) => {
    return prisma.nota.findFirst({
        where: { disciplinaId, userId },
        include: {
            disciplina: true,
            user: true
        }
    });
};

export const criar = (data: any) => {
    return prisma.nota.create({
        data,
        include: {
            user: true,
            disciplina: true
        }
    });
};

export const atualizar = (id: string, data: any) => {
    return prisma.nota.update({
        where: { id },
        data,
        include: {
            user: true,
            disciplina: true
        }
    });
};

export const criarPorNome = async ({ alunoNome, disciplinaNome, nota1, nota2, faltas, situacao }: any) => {
    const alunoNomeTrim = (alunoNome || "").trim();
    const disciplinaNomeTrim = (disciplinaNome || "").trim();

    // Busca usuário pelo nome (case-insensitive)
    const user = await prisma.user.findFirst({
        where: { name: { equals: alunoNomeTrim, mode: "insensitive" } }
    });
    if (!user) {
        const e: any = new Error(`Aluno não encontrado: "${alunoNomeTrim}"`);
        e.status = 404;
        throw e;
    }

    // Busca disciplina pelo nome (case-insensitive)
    const disciplina = await prisma.disciplina.findFirst({
        where: { nome: { equals: disciplinaNomeTrim, mode: "insensitive" } }
    });
    if (!disciplina) {
        const e: any = new Error(`Disciplina não encontrada: "${disciplinaNomeTrim}"`);
        e.status = 404;
        throw e;
    }

    // Cria a nota
    const notaFinal = (nota1 != null && nota2 != null) ? (nota1 + nota2) / 2 : null;

    const nota = await prisma.nota.create({
        data: {
            userId: user.id,
            disciplinaId: disciplina.id,
            nota1: nota1 ?? null,
            nota2: nota2 ?? null,
            notaFinal,
            faltas: faltas ?? 0,
            situacao: situacao ?? (notaFinal != null ? (notaFinal >= 6 ? "Aprovado" : "Reprovado") : "Em andamento")
        },
        include: {
            user: true,
            disciplina: true
        }
    });

    return nota;
};
