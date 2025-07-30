// src/components/Sidebar.tsx
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Drawer,
  Switch,
  Typography,
} from '@mui/material';
import {
  Home,
  Settings,
  Menu,
  Favorite,
  DarkMode,
  LightMode,
  AccountCircle,
  Dashboard,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // ✅ Added
import { useThemeContext } from '../context/ThemeContext';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const theme = useTheme(); // ✅ Get theme
  const { mode, toggleMode } = useThemeContext();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: open ? 200 : 60,
          transition: 'width 0.3s ease',
          backgroundColor: theme.palette.background.default, // ✅ Dynamic background
          color: theme.palette.text.primary, // ✅ Dynamic text
          p: 2,
          minHeight: '100vh',
          boxShadow: '2px 0 10px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={() => setOpen(!open)} sx={{ color: theme.palette.text.primary, mb: 2 }}>
          <Menu />
        </IconButton>

        {loading ? (
          <Skeleton
            variant="rectangular"
            width={open ? 140 : 30}
            height={120}
            sx={{ my: 2, borderRadius: 2, bgcolor: theme.palette.action.hover }}
          />
        ) : (
          <List sx={{ width: '100%' }}>
            <ListItemButton component={Link} to="/" sx={{ justifyContent: open ? 'initial' : 'center' }}>
              <ListItemIcon
                sx={{
                  color: theme.palette.text.primary,
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: 'center',
                }}
              >
                <Home />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItemButton>

            <ListItemButton component={Link} to="/favorites" sx={{ justifyContent: open ? 'initial' : 'center' }}>
              <ListItemIcon
                sx={{
                  color: theme.palette.text.primary,
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: 'center',
                }}
              >
                <Favorite />
              </ListItemIcon>
              {open && <ListItemText primary="Favorites" />}
            </ListItemButton>

            {/* ✅ Dashboard */}
            <ListItemButton component={Link} to="/dashboard" sx={{ justifyContent: open ? 'initial' : 'center' }}>
              <ListItemIcon
                sx={{
                  color: theme.palette.text.primary,
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: 'center',
                }}
              >
                <Dashboard />
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </ListItemButton>

            <ListItemButton component={Link} to="/profile" sx={{ justifyContent: open ? 'initial' : 'center' }}>
              <ListItemIcon
                sx={{
                  color: theme.palette.text.primary,
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: 'center',
                }}
              >
                <AccountCircle />
              </ListItemIcon>
              {open && <ListItemText primary="Profile" />}
            </ListItemButton>

            <ListItemButton onClick={() => setSettingsOpen(true)} sx={{ justifyContent: open ? 'initial' : 'center' }}>
              <ListItemIcon
                sx={{
                  color: theme.palette.text.primary,
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: 'center',
                }}
              >
                <Settings />
              </ListItemIcon>
              {open && <ListItemText primary="Settings" />}
            </ListItemButton>
          </List>
        )}
      </Box>

      {/* ✅ Settings Drawer */}
      <Drawer anchor="right" open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <Box sx={{ width: 250, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <DarkMode sx={{ mr: 1 }} />
            <Switch
              checked={mode === 'light'}
              onChange={toggleMode}
              inputProps={{ 'aria-label': 'Theme toggle' }}
            />
            <LightMode sx={{ ml: 1 }} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
