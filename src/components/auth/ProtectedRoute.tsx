import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from '@/api/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion avec l'URL actuelle comme état
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 