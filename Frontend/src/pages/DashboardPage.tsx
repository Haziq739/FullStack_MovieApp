// src/pages/DashboardPage.tsx
import { Box, Typography } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import TopBar from '../Components/TopBar';

const DashboardPage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex', //  make sidebar + content layout horizontal
        backgroundImage: `url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box
        sx={{
          flex: 1, // makes all remaining horizontal space
          p: 4,
          color: 'white',
          background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(139,0,0,0.7))',
        }}
      >
      <TopBar /> 
        <Typography variant="h4" fontWeight={600}>
          Welcome to the Dashboard
        </Typography>

        {/* Future: Add search bar, content, movies etc. here */}
      </Box>
    </Box>
  );
};

export default DashboardPage;
