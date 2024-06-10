import { readFile } from 'fs/promises';
import path from 'path';
import { compare } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sign, verify } from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  password: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  const filePath = path.join(process.cwd(), 'users.json');
  const fileContents = await readFile(filePath, 'utf-8');
  const users: User[] = JSON.parse(fileContents);

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Nieprawidłowy login lub hasło.' });
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Nieprawidłowy login lub hasło.' });
  }

  const sessionToken = sign({ userId: user.id, userLogin: user.username }, 'your-secret-key');
  

  res.setHeader(
    'Set-Cookie',
    `session-token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
  );

  return res.status(200).json({ id: user.id, message: 'Zalogowano.' });
};
