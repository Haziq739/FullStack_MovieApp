// src/routes/movie.routes.ts
import express from 'express';
import { searchMovies, getMovieDetails } from '../controllers/movie.controller';
import { verifyToken } from '../middleware/auth'; //Import middleware

const router = express.Router();

// Protected both routes using Middle ware
router.get("/search", verifyToken, searchMovies); // /api/movies/search?query=batman
router.get("/:id", verifyToken, getMovieDetails); // /api/movies/tt0372784

export default router;
