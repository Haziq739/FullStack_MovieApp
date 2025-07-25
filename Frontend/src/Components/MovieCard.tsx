import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OMDbSearchResult, OMDbMovieDetails } from '../types/omdb';
import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
} from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface MovieCardProps {
  movie: OMDbSearchResult;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  setMovies?: React.Dispatch<React.SetStateAction<OMDbMovieDetails[]>>;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  favorites,
  setFavorites,
  setMovies,
}) => {
  const [hovered, setHovered] = useState(false);
  const [details, setDetails] = useState<OMDbMovieDetails | null>(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const isFavorite = favorites.includes(movie.imdbID);
  const shouldShowFallback = !movie.Poster || movie.Poster === 'N/A' || hasImageError;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (!token) return;

      if (isFavorite) {
        await axios.delete(
          `http://localhost:5000/api/favorites/remove/${movie.imdbID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFavorites((prev) => prev.filter((id) => id !== movie.imdbID));

        if (setMovies) {
          setMovies((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
        }

        setSnackbarMessage('Removed from Favorites');
        setSnackbarOpen(true);
      } else {
        await axios.post(
          'http://localhost:5000/api/favorites/add',
          { imdbID: movie.imdbID },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFavorites((prev) => [...prev, movie.imdbID]);

        setSnackbarMessage('Added to Favorites');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Favorite toggle failed:', err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/movies/${movie.imdbID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDetails(res.data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      }
    };

    if (hovered && !details) {
      fetchDetails();
    }
  }, [hovered, details, movie.imdbID, token]);

  return (
    <>
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
        {shouldShowFallback ? (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: '#1c1c1c',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              px: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" color="gray">
              No poster available
            </Typography>
            <Typography variant="body2">{movie.Title}</Typography>
          </Box>
        ) : (
          <CardMedia
            component="img"
            image={movie.Poster}
            alt={movie.Title}
            sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            onError={() => setHasImageError(true)}
          />
        )}

        {details?.imdbRating && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 40,
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

        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            color: 'red',
            zIndex: 3,
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

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
              {details.Plot.length > 100
                ? `${details.Plot.slice(0, 100)}...`
                : details.Plot}
            </Typography>
            <Typography variant="caption" color="gray" mt={1}>
              Genre: {details.Genre}
            </Typography>
          </Box>
        )}
      </Card>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: '#b71c1c', // 🔴 Dark red
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default MovieCard;
