// src/pages/FavoritesPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Skeleton,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import Sidebar from '../Components/Sidebar';
import TopBar from '../Components/TopBar';
import MovieCard from '../Components/MovieCard';
import type { OMDbMovieDetails } from '../types/omdb';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [movies, setMovies] = useState<OMDbMovieDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/favorites/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favIDs = res.data.favorites || [];
        setFavorites(favIDs);

        const moviePromises = favIDs.map((imdbID: string) =>
          axios
            .get(`http://localhost:5000/api/movies/${imdbID}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => res.data)
        );

        const movieData = await Promise.all(moviePromises);
        setMovies(movieData);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token, navigate]);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          p: 4,
          background: isDark
            ? 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(139,0,0,0.7))'
            : theme.palette.background.default,
          color: theme.palette.text.primary,
          overflowY: 'auto',
        }}
      >
        <TopBar />
        <Typography variant="h5" mt={2} mb={3}>
          ❤️ Your Favorite Movies
        </Typography>

        {loading ? (
          <Box display="flex" flexWrap="wrap" gap={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Box key={i} width={{ xs: '100%', sm: '48%', md: '31%', lg: '23%' }}>
                <Skeleton
                  variant="rectangular"
                  height={350}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isDark ? '#2c2c2c' : '#e0e0e0', // dynamic skeleton color
                  }}
                />
                <Skeleton sx={{ bgcolor: isDark ? '#2c2c2c' : '#e0e0e0' }} />
                <Skeleton sx={{ bgcolor: isDark ? '#2c2c2c' : '#e0e0e0' }} />
              </Box>
            ))}
          </Box>
        ) : favorites.length === 0 ? (
          <Box mt={5} textAlign="center">
            <Typography variant="body1" gutterBottom>
              You have no favorite movies yet. Start exploring and add some!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/dashboard')}
              sx={{ mt: 2 }}
            >
              Go to Dashboard
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" gap={3}>
            {movies.map((movie) => (
              <Box key={movie.imdbID} width={{ xs: '100%', sm: '48%', md: '31%', lg: '23%' }}>
                <MovieCard
                  movie={movie}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setMovies={setMovies}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
