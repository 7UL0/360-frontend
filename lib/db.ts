import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'baza',
  port: Number(process.env.DB_PORT) || 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
