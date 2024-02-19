import express, { Request, Response } from 'express';
import { verbose } from 'sqlite3';
import { config } from 'dotenv';

config(); //setting .env

const port = process.env.PORT || 3000;

const app = express();
const sqlite = verbose();
const db = new sqlite.Database(process.env.DATABASE_URL!, sqlite.OPEN_READWRITE, handleSqliteError);

function handleSqliteError(err: Error | null) {
  if (err instanceof Error) {
    return console.log(err.message);
  }

  console.log('connect database successfully');
}

app.use(express.json());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
