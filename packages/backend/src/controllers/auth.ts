import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../model/pirsma';
import { passwordPattern } from '../constants';

const jwtSecret = process.env.JWT_SECRET || '';

const salt = 10;

function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

function generateAccessToken(val: Parameters<typeof jwt.sign>[0]) {
  return jwt.sign(val, jwtSecret, { expiresIn: '7 days' });
}

export const checkEmail: RequestHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await prismaClient.user.findUnique({ where: { email } });

    return res.status(200).json({ isExisting: !!existingUser });
  } catch (err) {
    return res.json(err);
  }
};

export const register: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isValid = passwordPattern.test(password);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const existingUser = await prismaClient.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const hash = bcrypt.hashSync(password, salt);

    const userData = { email, password: hash, name: '' };

    const user = await prismaClient.user.create({ data: userData });
    const token = generateAccessToken({ id: user.id, name: user.name, email: user.email });

    res.status(201).json({ ...user, token });
  } catch (err) {
    res.json(err);
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prismaClient.user.findUnique({ where: { email } });
    const result = comparePassword(password, user?.password ?? '');

    if (user && result) {
      const { id, name, email } = user;
      const token = generateAccessToken({ id, name, email });

      res.status(200).json({ id, name, email, token });
    } else {
      res.status(400).json({ message: 'Login failed.' });
    }
  } catch (err) {
    res.json(err);
  }
};
