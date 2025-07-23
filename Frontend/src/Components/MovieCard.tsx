// src/Components/MovieCard.tsx
// Importing Third Party Packages
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OMDbSearchResult, OMDbMovieDetails } from '../types/omdb';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import axios from 'axios';

interface MovieCardProps {
  movie: OMDbSearchResult;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const [details, setDetails] = useState<OMDbMovieDetails | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const posterUrl =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x400?text=No+Image';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${movie.imdbID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };

    if (hovered && !details) {
      fetchDetails();
    }
  }, [hovered, details, movie.imdbID, token]);

  return (
    <Card
      sx={{
        width: '100%',
        height: 350,
        background: 'linear-gradient(to bottom, #000, #8b0000)',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        color: 'white',
        position: 'relative',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      {/* Poster */}
      <CardMedia
        component="img"
        image={posterUrl}
        alt={movie.Title}
        sx={{ height: '100%', objectFit: 'cover' }}
      />

      {/* ⭐ Rating */}
      {details?.imdbRating && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#FFD700',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            zIndex: 2,
          }}
        >
          ⭐ {details.imdbRating}
        </Box>
      )}

      {/* Hover Overlay */}
      {hovered && details && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            background: 'rgba(0, 0, 0, 0.85)',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="h6" noWrap>
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="gray">
            {movie.Year} • {movie.Type}
          </Typography>
          <Typography variant="body2" mt={1}>
            {details.Plot.length > 100 ? `${details.Plot.slice(0, 100)}...` : details.Plot}
          </Typography>
          <Typography variant="caption" color="gray" mt={1}>
            Genre: {details.Genre}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default MovieCard;
