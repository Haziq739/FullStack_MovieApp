// src/routes/favorite.routes.ts

import { Router } from 'express';
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from '../controllers/favorite.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/add', verifyToken, addFavorite);
router.delete('/remove/:imdbID', verifyToken, removeFavorite);
router.get('/list', verifyToken, getFavorites);

export default router;