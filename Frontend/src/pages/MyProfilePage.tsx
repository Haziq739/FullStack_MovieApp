// src/pages/MyProfilePage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Skeleton,
  useTheme,
} from '@mui/material';
import Sidebar from '../Components/Sidebar';
import TopBar from '../Components/TopBar';

interface UserData {
  name: string;
  email: string;
}

const MyProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          p: 4,
          background: isDark
            ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(139,0,0,0.7)), url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`
            : theme.palette.background.default,
          backgroundSize: isDark ? 'cover' : 'initial',
          backgroundPosition: 'center',
          backgroundAttachment: isDark ? 'fixed' : 'initial',
          backgroundRepeat: 'no-repeat',
          color: theme.palette.text.primary,
          overflowY: 'auto',
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        <TopBar />
        <Typography variant="h5" mt={2} mb={3}>
          👤 My Profile
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: 500,
            mx: 'auto',
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
            borderRadius: 3,
            color: theme.palette.text.primary,
          }}
        >
          {loading ? (
            <>
              <Skeleton
                variant="circular"
                width={80}
                height={80}
                sx={{ mb: 2, bgcolor: isDark ? '#333' : '#ddd' }}
              />
              <Skeleton
                height={30}
                width="60%"
                sx={{ bgcolor: isDark ? '#333' : '#ddd' }}
              />
              <Skeleton
                height={25}
                width="80%"
                sx={{ bgcolor: isDark ? '#333' : '#ddd' }}
              />
            </>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                }}
              >
                {user?.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MyProfilePage;
