// src/middleware/auth.ts

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthRequest } from '../types/user.types';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = decoded.userId; // ✅ Store only userId
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};
