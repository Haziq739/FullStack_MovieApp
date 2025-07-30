// src/pages/MovieDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  Container,
  CardContent,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import type { OMDbMovieDetails } from '../types/omdb';
import Sidebar from '../Components/Sidebar';
import TopBar from '../Components/TopBar';

const MovieDetailPage = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<OMDbMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/movies/${imdbID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID, token]);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: isDark
            ? `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(139,0,0,0.9)), url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`
            : theme.palette.background.default,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflowX: 'hidden',
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: isDark ? 'white' : 'black' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        background: isDark
          ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(139,0,0,0.8)), url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`
          : theme.palette.background.default,
        backgroundSize: isDark ? 'cover' : 'initial',
        backgroundPosition: 'center',
        backgroundAttachment: isDark ? 'fixed' : 'initial',
        fontFamily: '"Poppins", sans-serif',
        color: theme.palette.text.primary,
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          p: 4,
          color: theme.palette.text.primary,
          overflowY: 'auto',
          maxHeight: '100vh',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <TopBar />
        </Box>

        <Box display="flex" justifyContent="center">
          <Container maxWidth="md">
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                bgcolor: isDark ? 'rgba(0,0,0,0.6)' : '#f5f5f5',
                color: isDark ? 'white' : 'black',
                boxShadow: 5,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                image={movie?.Poster}
                alt={movie?.Title}
                sx={{
                  width: { xs: '100%', md: 300 },
                  height: { xs: 450, md: '100%' },
                  objectFit: 'cover',
                }}
              />

              <CardContent sx={{ p: 4, flex: 1 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {movie?.Title}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  ⭐ IMDB Rating: {movie?.imdbRating}
                </Typography>

                <Typography variant="body1" paragraph>
                  {movie?.Plot}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <strong>Genre:</strong> {movie?.Genre}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Released:</strong> {movie?.Released}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Director:</strong> {movie?.Director}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Actors:</strong> {movie?.Actors}
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetailPage;
