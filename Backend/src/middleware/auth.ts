import {Response, NextFunction } from 'express'; // Importing third party package
import jwt from 'jsonwebtoken'; // Importing third party package
import dotenv from 'dotenv'; // Importing third party package
import { AuthRequest } from '../types/user.types'; // Adjust path if needed

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;


export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};
