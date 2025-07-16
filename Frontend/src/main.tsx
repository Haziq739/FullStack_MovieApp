import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ RIGHT PLACE
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ KEEP THIS ONLY HERE */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
