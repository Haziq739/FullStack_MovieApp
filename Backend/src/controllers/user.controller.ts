import { Request, Response } from 'express'; // Importing third party package
import User from '../models/user.model';// Importing User model Schema
import jwt from 'jsonwebtoken'; // Importing third party package
import dotenv from 'dotenv'; // Importing third party package
import { JWT_EXPIRES_IN, validateEmail } from '../utils/constants';
import { MESSAGE_CODES } from '../utils/messageCodes'; // Importing responses from another file
import { STATUS_CODES } from '../config/statusCodes'; // Importing status codes from another file

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;



// Controller function for register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body; 

  if (!name || !email || !password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGE_CODES.MISSING_SIGNUP_FIELDS });
  }

  if (!validateEmail(email)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGE_CODES.INVALID_EMAIL });
  }

  if (password.length < 6) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGE_CODES.SHORT_PASSWORD });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(STATUS_CODES.CONFLICT).json({ message: MESSAGE_CODES.USER_EXISTS });
    }

    const user = new User({ name, email, password }); 
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.status(STATUS_CODES.CREATED).json({ token });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({ message: 'Server error.' });
  }
};

// Controller Function for login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGE_CODES.MISSING_LOGIN_FIELDS });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGE_CODES.INVALID_CREDENTIALS });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGE_CODES.INVALID_CREDENTIALS });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.status(STATUS_CODES.OK).json({ token });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({ message: MESSAGE_CODES.SERVER_ERROR });
  }
};
