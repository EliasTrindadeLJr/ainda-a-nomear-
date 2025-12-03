import { Request, Response } from "express";
import authService from "@/services/auth.service";

export class AuthController {
    async login(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        try {
            const userData = await authService.execute({ email, password });

            return response.status(200).json({
                error: false,
                message: null,
                ...userData
            });

        } catch (error: any) {
            return response.status(400).json({
                error: true,
                message: error.message,
                user: null
            });
        }
    }
}
