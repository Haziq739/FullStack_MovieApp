// src/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage'; 
import MovieDetailPage from '../pages/MovieDetailPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} /> {/* ✅ Added */}
      <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;