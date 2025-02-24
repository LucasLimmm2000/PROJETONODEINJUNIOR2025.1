// src/routes/user.routes.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
    const { name, email, password, photo } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          photo
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  });
  
  
// Rota para buscar um usuário por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Rota para atualizar um usuário por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, photo } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password, // ja coloquei aquela dependencia de criptografia
        photo,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Rota para excluir um usuário por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

export default router;
