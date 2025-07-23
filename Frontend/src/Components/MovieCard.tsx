// src/Components/MovieCard.tsx
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OMDbSearchResult, OMDbMovieDetails } from '../types/omdb';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import axios from 'axios';
=======
// imporing third party packages
import { useState, useEffect } from 'react';
import type {OMDbSearchResult, OMDbMovieDetails} from '../types/omdb';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b

interface MovieCardProps {
  movie: OMDbSearchResult;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
<<<<<<< HEAD
  const [hovered, setHovered] = useState(false);
  const [details, setDetails] = useState<OMDbMovieDetails | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const posterUrl =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x400?text=No+Image';
=======
  const [flipped, setFlipped] = useState(false);
  const [details, setDetails] = useState<OMDbMovieDetails | null>(null);
  const token = localStorage.getItem('token');

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b

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

<<<<<<< HEAD
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
=======
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
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
  );
};

export default MovieCard;
