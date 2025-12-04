import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

type User = {
    matricula?: string | null;
    email?: string;
    name?: string | null;
    password?: string;
    image?: string | null;
    birthDate?: Date | string;
    cpf?: string;
    role?: 'aluno' | 'admin'; // adiciona role
};

async function gerarMatricula() {
    const ano = new Date().getFullYear();

    const ultimo = await prisma.user.findFirst({
        orderBy: { matricula: "desc" }
    });

    let numero = 1;

    if (ultimo?.matricula) {
        const seq = Number(ultimo.matricula.slice(4)); 
        numero = seq + 1;
    }

    // formato: 20250001
    return `${ano}${numero.toString().padStart(4, '0')}`;
}

export async function list() {
    return prisma.user.findMany({ orderBy: { id: 'asc' } });
}

export async function getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
}

export async function create(
    data: { 
        email: string; 
        name?: string | null; 
        password: string; 
        image?: string | null; 
        birthDate: Date | string; 
        cpf: string;
        role?: 'aluno' | 'admin'; // opcional, se não passar assume aluno
    }
) {
    const hashed = await bcrypt.hash(data.password, 10);

    // Gera matrícula automática
    const matricula = await gerarMatricula();

    return prisma.user.create({
        data: {
            ...data,
            password: hashed,
            matricula,
            role: data.role ?? 'aluno' // default 'aluno'
        }
    });
}

export async function update(id: string, data: User) {
    return prisma.user.update({
        where: { id },
        data
    });
}

export async function remove(id: string) {
    return prisma.user.delete({ where: { id } });
}
