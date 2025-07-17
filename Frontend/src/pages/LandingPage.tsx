// src/pages/LandingPage.tsx
import { Button, Typography, Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const loadFont = () => {
  const link = document.createElement('link');
  link.href =
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFont();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(139, 0, 0, 0.7)),
          url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: '"Poppins", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 8px 20px rgba(255, 0, 0, 0.3)',
        }}
      >
        {/* 🎬 Title Shimmer */}
        {loading ? (
          <Skeleton
            variant="text"
            animation="wave"
            height={70}
            width={300}
            sx={{ bgcolor: 'grey.800', mx: 'auto' }}
          />
        ) : (
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: 700, color: '#ff3c3c' }}
          >
            🎬 Movie App
          </Typography>
        )}

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 400 }}>
          Discover, Search & Save your favorite movies in style
        </Typography>

        <Box mt={4}>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{
              mx: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              boxShadow: '0 4px 10px rgba(255, 0, 0, 0.4)',
            }}
            href="/login"
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              mx: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderWidth: 2,
              borderColor: '#fff',
              color: '#fff',
              '&:hover': {
                borderColor: '#ff3c3c',
                color: '#ff3c3c',
              },
            }}
            href="/signup"
          >
            Signup
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LandingPage;
