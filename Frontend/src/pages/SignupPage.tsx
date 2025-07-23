// src/pages/SignupPage.tsx
// importing third party packages and components from material UI
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

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(139, 0, 0, 0.6)),
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
          Sign Up
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="dense"
            {...register('name', { required: 'Name is required' })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message || ''}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />

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

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="dense"
            {...register('confirmPassword', { required: 'Please confirm your password' })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message || ''}
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
            Register
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default SignupPage;