import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/auth/LoginPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <h1>Hello authenticated user</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
