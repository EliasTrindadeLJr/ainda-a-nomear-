import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  senha: z.string().min(6, { message: "Senha precisa ter ao menos 6 caracteres" })
});


export const cadastroSchema = z.object({
  name: z.string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),

  email: z.string()
    .email({ message: "Email inválido" }),

  password: z.string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),

  cpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF inválido. Use o formato: 000.000.000-00",
    }),

  birthDate: z.string()
    .min(1, { message: 'Data de nascimento é obrigatória' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type CadastroFormData = z.infer<typeof cadastroSchema>;
