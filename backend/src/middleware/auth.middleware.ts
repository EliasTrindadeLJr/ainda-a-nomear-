import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { getById } from '../services/users.service';

export const Authentication = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      if (!authorization) {
        return response.status(401).json({ error: 'Token is missing' });
      }

      const token = authorization.replace('Bearer', '').trim();

      // verifica e decodifica o token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };

      const user = await getById(decoded.id);

      if (!user) {
        return response.status(401).json({ error: 'User not found' });
      }

      // adiciona dados do usuário na request
      request.user = {
        id: user.id,
        email: user.email,
        username: user.name ?? '',
        role: user.role, // aqui você já tem role
      };

      next();
    } catch (err) {
      return response.status(401).json({ error: 'Invalid token' });
    }
  };
};
