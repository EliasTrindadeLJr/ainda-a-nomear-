import nodemailer from "nodemailer";

export async function sendEmailToResponsible({
    email,
    aluno,
    disciplina,
    nota1,
    nota2,
    notaFinal,
    situacao
}) {
    if (!email) {
        console.warn("⚠ Email não encontrado para o aluno");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // seu gmail
            pass: process.env.EMAIL_PASS  // app password do gmail
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const msg = `
Olá ${aluno},

Uma nova atualização de nota foi registrada no sistema acadêmico:

📚 *Disciplina:* ${disciplina}
📝 *Nota 1:* ${nota1 ?? "—"}
📝 *Nota 2:* ${nota2 ?? "—"}
🏁 *Nota Final:* ${notaFinal ?? "—"}
📌 *Situação:* ${situacao}

Acesse o portal do aluno para mais detalhes.
`;

    await transporter.sendMail({
        from: `Sistema Acadêmico <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Atualização de nota - ${disciplina}`,
        text: msg
    });

    console.log(`📧 Email enviado para ${email}`);
}
