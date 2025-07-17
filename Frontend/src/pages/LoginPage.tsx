// src/pages/LoginPage.tsx
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.7)),
          url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Poppins", sans-serif',
        px: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(0,0,0,0.75)',
          p: 3,
          borderRadius: 3,
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: '#fff', fontWeight: 600 }}
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
            label="Email"
            type="email"
            variant="outlined"
            margin="dense"
            {...register('email', { required: 'Email is required' })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message || ''}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            {...register('password', { required: 'Password is required' })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message || ''}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 3, fontWeight: 600 }}
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default LoginPage;