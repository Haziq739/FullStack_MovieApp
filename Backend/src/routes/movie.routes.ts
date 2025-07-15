import { Router } from 'express'; // Importing third party package
import { fetchMovies } from '../controllers/movie.controller'; // Fetching movies
import { verifyToken } from '../middleware/auth';// Veruifying token middleware 


const router = Router();

// Protected route - only logged in user can fetch movies
router.get('/search', verifyToken, fetchMovies);

export default router;
