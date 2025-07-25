// src/context/ThemeContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: { default: '#121212' },
            primary: { main: '#ff1744' },
          }
        : {
            background: { default: '#f4f4f4' },
            primary: { main: '#d32f2f' },
          }),
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
