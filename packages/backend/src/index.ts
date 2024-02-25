import express from 'express';
import { config } from 'dotenv';
import { PrismaClient } from 'db'

config(); //setting .env

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  try {
    const prisma = new PrismaClient() 
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  } catch (error) {
    console.error(error);
  }
});
