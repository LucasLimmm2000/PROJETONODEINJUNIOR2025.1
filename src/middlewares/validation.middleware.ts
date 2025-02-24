import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Definindo o esquema de validação do usuário com Zod
const userSchema = z.object({
  name: z.string().min(1, { message: "Nome é requerido" }),
  email: z.string().email({ message: "endereço de email inválido" }),
  password: z.string().min(6, { message: "A senha tem que ter no mínimo 6 caracteres" }),
});


export const validateUserCreation = (req: Request, res: Response, next: NextFunction) => {
  try {
    
    userSchema.parse(req.body);
    next();
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
