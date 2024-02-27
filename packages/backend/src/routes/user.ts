import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ name: 'John Doe', desc: 'Hello, world!' });
});

export default router;
