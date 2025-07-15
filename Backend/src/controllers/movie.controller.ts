import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;

export const fetchMovies = async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
    if (response.data.Response === 'False') {
      return res.status(404).json({ message: response.data.Error });
    }
    return res.status(200).json({ movies: response.data.Search });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch movies from OMDb.' });
  }
};
