import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInDB } from '@/api/generated/models/UserInDB';

interface AuthState {
  user: UserInDB | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserInDB, token: string) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user: UserInDB, token: string) => {
        set({ user, token, isAuthenticated: true });
      },
      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },
      clearAuth: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
