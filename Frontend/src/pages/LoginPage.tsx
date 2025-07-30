import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link,
  Paper,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovieIcon from '@mui/icons-material/Movie';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useThemeContext } from '../context/ThemeContext';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const { toggleMode, mode } = useThemeContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-internal-autofill-selected {
        box-shadow: 0 0 0 1000px ${isDark ? '#1e1e1e' : '#fafafa'} inset !important;
        -webkit-text-fill-color: ${theme.palette.text.primary} !important;
        transition: background-color 5000s ease-in-out 0s !important;
        caret-color: ${theme.palette.text.primary} !important;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [isDark, theme.palette.text.primary]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: isDark
          ? `linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.9)),
               url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`
          : theme.palette.background.default,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Poppins", sans-serif',
        px: 2,
        position: 'relative',
      }}
    >
      {/* Theme Toggle Button */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Tooltip title="Settings">
          <IconButton onClick={handleMenuClick} sx={{ color: isDark ? 'white' : 'black' }}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => {
              toggleMode();
              handleClose();
            }}
          >
            <IconButton sx={{ mr: 1 }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            Toggle Theme
          </MenuItem>
        </Menu>
      </Box>

      {/* Main Card */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
          <Paper
            elevation={10}
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              borderRadius: 4,
              overflow: 'hidden',
              maxWidth: 750,
              width: '100%',
              height: isMobile ? 'auto' : 470,
              boxShadow: '0 0 45px rgba(183, 28, 28, 0.5)',
              bgcolor: theme.palette.background.paper,
            }}
          >
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ flex: 1 }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(to bottom right, #000000, #b71c1c)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  color: 'white',
                  height: '100%',
                  textAlign: 'center',
                  gap: 2,
                }}
              >
                <motion.div
                  initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <MovieIcon sx={{ fontSize: 50 }} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Welcome Back 👋
                  </Typography>
                  <Typography fontSize={13}>
                    Dive into cinema. Discover, save, and enjoy your favorite movies.
                  </Typography>
                </motion.div>
              </Box>
            </motion.div>

            {/* Right - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ flex: 1 }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.background.default,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ textAlign: 'center', color: theme.palette.text.primary }}
                >
                  Login
                </Typography>

                {errorMsg && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMsg}
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    {...register('email', { required: 'Email is required' })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message || ''}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        color: theme.palette.text.primary,
                        backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
                        '& fieldset': { borderColor: isDark ? '#444' : '#ccc' },
                        '&:hover fieldset': { borderColor: '#777' },
                        '&.Mui-focused fieldset': { borderColor: '#f44336' },
                      },
                      '& label.Mui-focused': { color: '#f44336' },
                      '& .MuiFormHelperText-root': { color: '#f44336' },
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="dense"
                    {...register('password', { required: 'Password is required' })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message || ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            size="small"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        color: theme.palette.text.primary,
                        backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
                        '& fieldset': { borderColor: isDark ? '#444' : '#ccc' },
                        '&:hover fieldset': { borderColor: '#777' },
                        '&.Mui-focused fieldset': { borderColor: '#f44336' },
                      },
                      '& label.Mui-focused': { color: '#f44336' },
                      '& .MuiFormHelperText-root': { color: '#f44336' },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: '#b71c1c',
                      '&:hover': { backgroundColor: '#d32f2f' },
                    }}
                  >
                    LOGIN
                  </Button>
                </form>

                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 2, color: theme.palette.text.secondary }}
                >
                  Don't have an account?{' '}
                  <Link
                    onClick={() => navigate('/signup')}
                    sx={{ cursor: 'pointer', color: '#90caf9' }}
                    underline="hover"
                  >
                    Sign Up
                  </Link>
                </Typography>

                {/* ✅ Back to Home Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ marginTop: '16px' }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/')}
                    startIcon={<MovieIcon />}
                    sx={{
                      fontWeight: 'bold',
                      borderColor: isDark ? '#fff' : '#444',
                      color: isDark ? '#fff' : '#444',
                      '&:hover': {
                        borderColor: '#f44336',
                        color: '#f44336',
                        backgroundColor: isDark ? '#222' : '#fbe9e7',
                      },
                    }}
                  >
                    Back to Home
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
