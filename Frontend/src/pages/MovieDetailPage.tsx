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
} from '@mui/material';
import axios from 'axios';
import type { OMDbMovieDetails } from '../types/omdb';

const MovieDetailPage = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<OMDbMovieDetails | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${imdbID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };

    fetchMovie();
  }, [imdbID, token]);

  if (!movie) return <CircularProgress />;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(139,0,0,0.9)),
          url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems="flex-start"
          gap={4}
        >
          <Card sx={{ width: 300, borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={movie.Poster}
              alt={movie.Title}
              sx={{ borderRadius: 2 }}
            />
          </Card>

          <Box flex={1}>
            <Typography variant="h3" gutterBottom>
              {movie.Title}
            </Typography>

            <Typography variant="h6" gutterBottom>
              ⭐ IMDB Rating: {movie.imdbRating}
            </Typography>

            <Typography variant="body1" paragraph>
              {movie.Plot}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <strong>Genre:</strong> {movie.Genre}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Released:</strong> {movie.Released}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Director:</strong> {movie.Director}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Actors:</strong> {movie.Actors}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MovieDetailPage;
