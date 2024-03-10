import { Router } from 'express';

const router = Router();

router.get('/profile', (req, res) => {
  // to retrieve user data
  // console.log('🚀 ~ router.get ~ res:', res.locals.user);

  res.json({ name: 'John Doe', desc: 'Hello, world!' });
});

export default router;
