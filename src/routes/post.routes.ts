// src/routes/post.routes.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
});

// Rota para criar um novo post
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body; 
  
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId, // Relaciona o post ao usuário
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
});

// Rota para buscar um post por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true }, 
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar post' });
  }
});

// Rota para atualizar um post por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        userId, 
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar post' });
  }
});

// Rota para excluir um post por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir post' });
  }
});

export default router;
