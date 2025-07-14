import { Request, Response } from 'express'; // Importing third party package
import User from '../models/user.model';// Importing User model Schema
import jwt from 'jsonwebtoken'; // Importing third party package
import dotenv from 'dotenv'; // Importing third party package
import { JWT_EXPIRES_IN, validateEmail } from '../config/constants';
import { MESSAGE_CODES } from '../config/messageCodes'; // Importing responses from another file

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;



// Controller function for register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body; 

  if (!name || !email || !password) {
    return res.status(400).json({ message: MESSAGE_CODES.MISSING_SIGNUP_FIELDS });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: MESSAGE_CODES.INVALID_EMAIL });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: MESSAGE_CODES.SHORT_PASSWORD });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: MESSAGE_CODES.USER_EXISTS });
    }

    const user = new User({ name, email, password }); 
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Controller Function for login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: MESSAGE_CODES.MISSING_LOGIN_FIELDS });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: MESSAGE_CODES.INVALID_CREDENTIALS });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: MESSAGE_CODES.INVALID_CREDENTIALS });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: MESSAGE_CODES.SERVER_ERROR });
  }
};
