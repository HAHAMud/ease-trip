import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import { PrismaClient } from 'db';
import routes from './routes';

config(); //setting .env

const port = process.env.PORT || 4004;

const app = express();

app.use(express.json());

app.listen(port, () => {
  try {
    const prisma = new PrismaClient();
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
  }
});

app.get('/hc', (req: Request, res: Response) => {
  res.send('ok');
});

app.use('/api/user', routes.user);
