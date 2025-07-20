// src/controllers/movie.controller.ts

import axios from "axios";
import { Request, Response } from "express";
import { OMDbSearchResponse, OMDbMovieDetails } from "../types/omdb";

const OMDB_BASE_URL = "http://www.omdbapi.com/";
const API_KEY = process.env.OMDB_API_KEY;

// ✅ Updated searchMovies with proper pagination support
export const searchMovies = async (req: Request, res: Response) => {
  const query = req.query.query as string;
  const page = req.query.page || 1;

  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const { data } = await axios.get<OMDbSearchResponse>(OMDB_BASE_URL, {
      params: {
        s: query,
        apikey: API_KEY,
        page,
      },
    });

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error });
    }

    // ✅ OMDb already returns only 10 movies per page,
    // but we ensure that to avoid inconsistency.
    const results = data.Search?.slice(0, 10) || [];

    return res.json({
      Search: results,
      totalResults: data.totalResults || '0',
    });
  } catch (err) {
    console.error("OMDb Search Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Movie Details (unchanged)
export const getMovieDetails = async (req: Request, res: Response) => {
  const imdbID = req.params.id;

  try {
    const { data } = await axios.get<OMDbMovieDetails>(OMDB_BASE_URL, {
      params: {
        i: imdbID,
        apikey: API_KEY,
      },
    });

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error });
    }

    return res.json(data);
  } catch (err) {
    console.error("OMDb Detail Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
