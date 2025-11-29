import { prisma } from '../database/prisma';
import { WebhookEvent, CreateWebhookEvent} from '../types/webhook.types';

export class WebhookService{
    async findAll(limit: number = 50): Promise <WebhookEvent[]> {
        return prisma.webhookEvent.findMany({
            orderBy: { createdAt: 'desc'},
            take: limit,
        });
    }

    async create(eventData: CreateWebhookEvent): Promise<WebhookEvent> {
        return prisma.webhookEvent.create({
        data: eventData,
        });
    }


    async updateStatus(id:number, status: string): Promise<WebhookEvent> {
        return prisma.webhookEvent.update({
            where: {id},
            data: {status},
        });
    }

    async findPendingEvents(): Promise<WebhookEvent[]> {
        return prisma.webhookEvent.findMany({
            where: { status: 'pending' },
            orderBy: { createdAt: 'asc' },
        });
  }
}