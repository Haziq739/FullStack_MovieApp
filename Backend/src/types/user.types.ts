// src/types/user.types.ts
import { Request } from 'express'; // Importing third party package

import { Document } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  favorites?: string[]; // Added favorites field
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Exporting interface for authentication
export interface AuthRequest extends Request {
  user?: string | object;
}