import { CadastroFormData } from "./schemas";

export async function cadastrarAluno(data: CadastroFormData) {
  const payload = {
    name: data.name,
    email: data.email,
    birthDate: new Date(data.birthDate), // Prisma exige Date
    cpf: data.cpf,
    password: data.password,
  };

  const response = await fetch("http://localhost:3333/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || "Erro ao cadastrar usuário");
  }

  return response.json();
}
