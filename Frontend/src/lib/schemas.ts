import { z } from 'zod';

export const loginSchema = z.object({
  matricula: z.string()
    .min(1, { message: 'Matrícula é obrigatória' })
    .regex(/^\d+$/, { message: 'Matrícula deve conter apenas números' }),
  senha: z.string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export const cadastroSchema = z.object({
  nome: z.string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
  endereco: z.string()
    .min(5, { message: 'Endereço deve ter no mínimo 5 caracteres' })
    .max(200, { message: 'Endereço deve ter no máximo 200 caracteres' }),
  dataNascimento: z.string()
    .min(1, { message: 'Data de nascimento é obrigatória' }),
  cpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido. Use o formato: 000.000.000-00' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type CadastroFormData = z.infer<typeof cadastroSchema>;
