import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useGetCurrentUser } from '@/api/hooks/users/useUsers';
import { validateToken } from '@/utils';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { refetch: fetchUser } = useGetCurrentUser();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isInitialized = useRef(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitialized.current) return;
      isInitialized.current = true;

      if (token) {
        if (!validateToken(token)) {
          clearAuth();
          return;
        }

        try {
          const result = await fetchUser();
          if (result.data) {
            setAuth(result.data, token);
          } else {
            clearAuth();
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          clearAuth();
        }
      }
    };

    initializeAuth();
  }, [token, user, fetchUser, setAuth, clearAuth]);

  return <>{children}</>;
}
