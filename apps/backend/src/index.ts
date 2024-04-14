import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { authToken } from './middleware';

config(); //setting .env

const port = process.env.PORT || 4004;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  try {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
  }
});

app.get('/hc', (req, res) => {
  res.send('ok');
});

app.use('/api/auth', routes.auth);
app.use('/api/user', authToken, routes.user);
