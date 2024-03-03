import { Router, Request, Response } from 'express';
import { PrismaClient } from 'db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ name: 'John Doe', desc: 'Hello, world!' });
});

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({ data: { email, password } });

    res.sendStatus(201);
  } catch (err) {
    res.json(err);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email } });

    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

export default router;
