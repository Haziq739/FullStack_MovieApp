// src/components/Sidebar.tsx
// Importing third party packages
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import { Home, Settings, Menu } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate shimmer loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        width: open ? 200 : 60,
        transition: 'width 0.3s ease',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        p: 2,
        minHeight: '100vh',
      }}
    >
      <IconButton onClick={() => setOpen(!open)} sx={{ color: 'white' }}>
        <Menu />
      </IconButton>

      {loading ? (
        <Skeleton variant="rectangular" width={open ? 140 : 30} height={120} sx={{ my: 2 }} />
      ) : (
        <List>
          <ListItemButton component={Link} to="/">
            <ListItemIcon sx={{ color: 'white', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
              <Home />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
              <Settings />
            </ListItemIcon>
            {open && <ListItemText primary="Settings" />}
          </ListItemButton>
        </List>
      )}
    </Box>
  );
};

export default Sidebar;