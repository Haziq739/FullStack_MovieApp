import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Avatar, Skeleton } from '@mui/material';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

interface UserData {
  name: string;
  email: string;
}

const MyProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

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
          backgroundImage: `url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'darken',
          backgroundColor: 'rgba(0,0,0,0.8)',
          overflowY: 'auto',
          color: 'white',
        }}
      >
        <TopBar />
        <Typography variant="h5" mt={2} mb={3}>
          👤 My Profile
        </Typography>

        <Paper elevation={4} sx={{ p: 4, maxWidth: 500, mx: 'auto', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
          {loading ? (
            <>
              <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
              <Skeleton height={30} width="60%" />
              <Skeleton height={25} width="80%" />
            </>
          ) : (
            <>
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6">{user?.name}</Typography>
                <Typography variant="body1">{user?.email}</Typography>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MyProfilePage;
