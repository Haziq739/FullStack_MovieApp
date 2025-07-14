import dotenv from 'dotenv'; // Importing third party package
dotenv.config();

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

// Regex for proper email validation
export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};