import mongoose from 'mongoose'; // Importing third party package
import dotenv from 'dotenv'; // Importing third party package

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
};
