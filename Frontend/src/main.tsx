import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.tsx';
import { AppThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AppThemeProvider>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
   </AppThemeProvider>
  </StrictMode>
);