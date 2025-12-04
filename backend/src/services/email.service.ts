import nodemailer from "nodemailer";

class EmailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!
    }
  });

  async sendPaymentConfirmation(to: string, description: string) {
    await this.transporter.sendMail({
      from: `"Financeiro" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Pagamento Confirmado",
      text: `Seu pagamento foi confirmado: ${description}`,
      html: `
        <h2>Pagamento Confirmado</h2>
        <p>O pagamento referente ao seguinte item foi confirmado:</p>
        <b>${description}</b>
      `
    });
  }
}

export default new EmailService();
