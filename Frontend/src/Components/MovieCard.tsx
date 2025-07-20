// src/Components/MovieCard.tsx
// imporing third party packages
import { useState, useEffect } from 'react';
import type {OMDbSearchResult, OMDbMovieDetails} from '../types/omdb';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

// Defining Interface for card 
interface MovieCardProps {
  movie: OMDbSearchResult;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [flipped, setFlipped] = useState(false);
  const [details, setDetails] = useState<OMDbMovieDetails | null>(null);
  const token = localStorage.getItem('token');

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

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

    if (flipped && !details) {
      fetchDetails();
    }
  }, [flipped, details, movie.imdbID, token]);

  return (
    <Box
      component={motion.div}
      onClick={handleFlip}
      sx={{ perspective: 1000, cursor: 'pointer' }}
    >
      <Box
        component={motion.div}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: 350,
        }}
      >
        {/* Front Side */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(to bottom, #000, #8b0000)',
            color: 'white',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}
            alt={movie.Title}
            sx={{ height: 250 }}
          />
          <CardContent>
            <Typography variant="h6" noWrap>
              {movie.Title}
            </Typography>
            <Typography variant="body2" color="gray">
              {movie.Year} • {movie.Type}
            </Typography>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#1c1c1c',
            color: 'white',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: 2,
          }}
        >
          {details ? (
            <>
              <Typography variant="h6" gutterBottom>
                {details.Title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {details.Plot}
              </Typography>
              <Typography variant="caption">
                Genre: {details.Genre}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">Loading details...</Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default MovieCard;
