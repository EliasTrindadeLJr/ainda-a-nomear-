import prisma from "../prisma/client";
import emailService from "./email.service";

class PaymentWebhookService {
  async handleAsaas(body: any) {
    console.log("Webhook Asaas recebido:", body);

    const event = body.event;
    const payment = body.payment;

    if (!payment?.id) {
      throw new Error("Pagamento inválido no webhook.");
    }

    // Atualiza o boleto no banco
    await prisma.boleto.update({
      where: { asaasId: payment.id },
      data: {
        status: payment.status,
        pagoEm: payment.confirmedDate || new Date()
      }
    });

    // Enviar e-mail somente se foi pago
    if (event === "PAYMENT_CONFIRMED" || payment.status === "CONFIRMED") {
      const aluno = await prisma.user.findFirst({
        where: { id: payment.customer }
      });

      if (aluno && aluno.email) {
        await emailService.sendPaymentConfirmation(
          aluno.email,
          payment.description ?? "Pagamento",
        );
      }
    }

    return true;
  }
}

export default new PaymentWebhookService();
