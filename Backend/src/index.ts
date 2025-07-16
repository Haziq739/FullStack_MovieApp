import express from 'express'; // Initializing third party package
import cors from 'cors';// Initializing third party package
import dotenv from 'dotenv';// Initializing third party package
import userRoutes from './routes/user.routes';
import { connectDB } from './config/db';
import movieRoutes from './routes/movie.routes'; //Importing movie routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix CORS issue (this allows requests from your frontend)
app.use(cors({
  origin: 'http://localhost:5173', // <-- change if using different port
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

});
