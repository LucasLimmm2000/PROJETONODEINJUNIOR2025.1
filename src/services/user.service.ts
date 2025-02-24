// src/services/user.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export const createUser = async (data: { name: string; email: string; password: string; photo?: string }) => {
  data.password = await bcrypt.hash(data.password, 10);
  return prisma.user.create({ data });
};
