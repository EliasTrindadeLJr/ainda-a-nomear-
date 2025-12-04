import { Request, Response } from "express";
import paymentWebhookService from "../services/paymentWebhook.service";

class PaymentController {
  async asaasWebhook(req: Request, res: Response) {
    try {
      await paymentWebhookService.handleAsaas(req.body);
      return res.status(200).send("OK");
    } catch (error) {
      console.error("Erro no webhook do Asaas:", error);
      return res.status(500).send("Erro");
    }
  }
}

export default new PaymentController();
