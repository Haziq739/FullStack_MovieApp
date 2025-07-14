import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix CORS issue (this allows requests from your frontend)
app.use(cors({
  origin: 'http://localhost:3000', // <-- change if using different port
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
