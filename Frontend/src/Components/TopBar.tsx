// src/components/TopBar.tsx
import { Box, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const TopBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        py: 2,
        px: 3,
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
      }}
    >
      <TextField
        placeholder="Search movies..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'white' }} />
            </InputAdornment>
          ),
          style: { color: 'white', borderColor: '#fff' },
        }}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        sx={{
          width: '60%',
          input: { color: '#fff' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#fff' },
            '&:hover fieldset': { borderColor: '#f00' },
            '&.Mui-focused fieldset': { borderColor: '#f00' },
          },
        }}
      />
    </Box>
  );
};

export default TopBar;