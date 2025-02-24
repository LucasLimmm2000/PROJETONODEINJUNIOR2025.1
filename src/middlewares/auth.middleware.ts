// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client'; 

// Middleware simplificado
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['user-id'];  

  if (!userId) {
    return res.status(401).json({ error: 'Não autorizado, Id faltando' });
  }

  // Definindo o user no objeto da requisição
  req.user = { id: userId as string } as User;  

  next();
};
