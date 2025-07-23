// src/Components/TopBar.tsx
// Importing third party package
import { Box, Typography } from '@mui/material';

const TopBar = () => {
  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Dashboard
      </Typography>
      {/* You can place user profile, notifications, etc. here */}
    </Box>
  );
};

export default TopBar;
