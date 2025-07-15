import dotenv from 'dotenv'; // Importing third party package
import { EMAIL_REGEX } from '../utils/constants'; // Importing regex from constants
dotenv.config();

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;


// Import regex for validation
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};