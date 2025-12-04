import { Router } from "express";
import paymentController from "../controllers/payment.controller";

const router = Router();

router.post("/webhook/asaas", paymentController.asaasWebhook);

export default router;
