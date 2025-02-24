// src/app.ts
import express from 'express';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';

const app = express();

app.use(express.json());



app.use('/users', userRoutes);
app.use('/posts', postRoutes);

export default app;

