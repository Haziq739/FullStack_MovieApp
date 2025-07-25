// src/controllers/movie.controller.ts

import axios from "axios";
import { Request, Response } from "express";
import { OMDbSearchResponse, OMDbMovieDetails } from "../types/omdb";

const OMDB_BASE_URL = "http://www.omdbapi.com/";
const API_KEY = process.env.OMDB_API_KEY;

// Updated searchMovies with proper pagination support
export const searchMovies = async (req: Request, res: Response) => {
  const query = req.query.query as string;
  const page = parseInt(req.query.page as string) || 1;

  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    // Fetch page 1
    const response1 = await axios.get<OMDbSearchResponse>(OMDB_BASE_URL, {
      params: {
        s: query,
        apikey: API_KEY,
        page,
      },
    });

    // Fetch page 2 (for extra results)
    const response2 = await axios.get<OMDbSearchResponse>(OMDB_BASE_URL, {
      params: {
        s: query,
        apikey: API_KEY,
        page: page + 1,
      },
    });

    // Combine valid results
    const allResults = [
      ...(response1.data.Search || []),
      ...(response2.data.Search || []),
    ].slice(0, 12); // ✅ Only keep first 12

    if (allResults.length === 0) {
      return res.status(404).json({ error: response1.data.Error || "No movies found" });
    }

    return res.json({
      Search: allResults,
      totalResults: response1.data.totalResults || '0', // keep original total count
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
