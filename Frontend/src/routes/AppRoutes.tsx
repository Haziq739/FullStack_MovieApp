// src/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;