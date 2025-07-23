// src/controllers/favorite.controller.ts
import { Response } from 'express';
import User from '../models/user.model';
import { AuthRequest, IUser } from '../types/user.types';

// POST /favorites/add
export const addFavorite = async (req: AuthRequest, res: Response) => {
  const { imdbID } = req.body;
  const userId = req.user as string;

  console.log("🔍 Incoming Favorite Request");
  console.log("➡ IMDb ID:", imdbID);
  console.log("➡ User ID:", userId);

  if (!imdbID) {
    return res.status(400).json({ error: 'IMDb ID is required' });
  }

  try {
    const user = await User.findById(userId);
    console.log("👤 Fetched User:", user);

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.favorites) user.favorites = [];

    if (!user.favorites.includes(imdbID)) {
      user.favorites.push(imdbID);
      await user.save();
    }

    res.status(200).json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (err) {
    console.error("❌ Error in addFavorite:", err);
    res.status(500).json({ error: 'Server error while adding favorite' });
  }
};

// DELETE /favorites/remove/:imdbID
export const removeFavorite = async (req: AuthRequest, res: Response) => {
  const { imdbID } = req.params;
  const userId = req.user as string;

  try {
    const user = await User.findById(userId) as IUser;
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.favorites = user.favorites?.filter((id) => id !== imdbID) || [];
    await user.save();

    res.status(200).json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (err) {
    console.error("Error in removeFavorite:", err);
    res.status(500).json({ error: 'Server error while removing favorite' });
  }
};

// GET /favorites/list
export const getFavorites = async (req: AuthRequest, res: Response) => {
  const userId = req.user as string;

  try {
    const user = await User.findById(userId) as IUser;
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    console.error("Error in getFavorites:", err);
    res.status(500).json({ error: 'Server error while fetching favorites' });
  }
};