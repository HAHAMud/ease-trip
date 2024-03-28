import { Router } from 'express';
import { PrismaClient } from 'db';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

const jwtSecret = process.env.JWT_SECRET || '';

function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

function generateAccessToken(val: Parameters<typeof jwt.sign>[0]) {
  return jwt.sign(val, jwtSecret, { expiresIn: '2 days' });
}

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email } });
    const result = comparePassword(password, user?.password ?? '');

    if (user && result) {
      const { id, name, email } = user;
      const token = generateAccessToken({ id, name });

      res.status(200).json({ id, name, email, token });
    } else {
      res.status(400).json({ message: 'Login failed.' });
    }
  } catch (err) {
    res.json(err);
  }
});

export default router;
