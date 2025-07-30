// src/pages/LandingPage.tsx
import { Box, Button, Typography, Skeleton, IconButton, Menu, MenuItem, Tooltip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../context/ThemeContext'; // make sure this exists

const loadFont = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { toggleMode, mode } = useThemeContext();

  useEffect(() => {
    loadFont();
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: isDark
          ? `linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.9)),
             url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`
          : `linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.85)),
             url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: '"Poppins", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: isDark ? '#fff' : '#000',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Settings Icon & Theme Toggle */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Tooltip title="Settings">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: isDark ? '#fff' : '#000' }}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => {
              toggleMode();
              setAnchorEl(null);
            }}
          >
            <IconButton sx={{ mr: 1 }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            Toggle Theme
          </MenuItem>
        </Menu>
      </Box>

      {/* Animated Main Box */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: isDark
            ? '0 8px 20px rgba(255, 0, 0, 0.3)'
            : '0 8px 20px rgba(183, 28, 28, 0.4)',
        }}
      >
        {/* Title */}
        {loading ? (
          <Skeleton
            variant="text"
            animation="wave"
            height={70}
            width={300}
            sx={{ bgcolor: isDark ? 'grey.800' : 'grey.300', mx: 'auto' }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: 700, color: '#ff3c3c' }}
            >
              🎬 CineMaxx
            </Typography>
          </motion.div>
        )}

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 400, color: isDark ? '#e0e0e0' : '#333' }}
        >
          Discover, Search & Save your favorite movies in style
        </Typography>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          <Box mt={4}>
            <Button
              variant="contained"
              size="large"
              sx={{
                mx: 2,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                backgroundColor: '#b71c1c',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                },
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
                borderColor: isDark ? '#fff' : '#b71c1c',
                color: isDark ? '#fff' : '#b71c1c',
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
      </motion.div>
    </Box>
  );
};

export default LandingPage;
