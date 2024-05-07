import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IS_PRODUCTION } from '@/constants';
import { serviceLogin } from '../apis';
import { loginSchema } from '../models';

interface LoginResult {
  message: string;
}

export function loginController(req: NextApiRequest, res: NextApiResponse<LoginResult>) {
  const { email, password } = loginSchema.parse(req.body);
  serviceLogin({ email, password })
    .then((response) => {
      const cookie = serialize('token', response.token, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      res.setHeader('Set-Cookie', cookie);
      res.status(200).json({
        message: 'Login success',
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
