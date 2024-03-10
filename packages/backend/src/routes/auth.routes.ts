import { Router, Request, Response } from 'express';
import { PrismaClient } from 'db';
import * as bcrypt from 'bcryptjs';

function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ name: 'John Doe', desc: 'Hello, world!' });
});

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 10);

    const userData = { email, password: hash, name: '' };
    const prisma = new PrismaClient();
    const user = await prisma.user.create({ data: userData });

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
    const result = comparePassword(password, user?.password ?? '');

    if (user && result) {
      res.status(200).json({
        user: { id: user.id, name: user.name, email: user.email },
      });
    } else {
      res.status(400).json({ message: 'Login failed.' });
    }
  } catch (err) {
    res.json(err);
  }
});

export default router;
