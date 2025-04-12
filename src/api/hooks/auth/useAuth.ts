import { AuthService } from '../../generated/services/AuthService';
import { LoginRequest } from '../../generated/models/LoginRequest';
import { Token } from '../../generated/models/Token';
import { useApiMutation, MutationOptions } from '../useApi';
import { useAuthStore } from '../../../store/authStore';
import { useGetCurrentUser } from '../users/useUsers';

export function useLogin(options?: MutationOptions<Token, LoginRequest>) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setToken = useAuthStore((state) => state.setToken);
  const { refetch: fetchUser } = useGetCurrentUser();

  const { mutate: login, ...rest } = useApiMutation<Token, LoginRequest>(
    (data) =>
      AuthService.loginForAccessTokenApiOptiboisV1AuthTokenPost({
        requestBody: data,
      }),
    {
      ...options,
      onSuccess: async (token) => {
        setToken(token.access_token);
        const result = await fetchUser();
        if (result.data) {
          setAuth(result.data, token.access_token);
        }
      },
    },
  );

  return { login, ...rest };
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return () => {
    clearAuth();
  };
}

export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated);
}

export function useCurrentUser() {
  return useAuthStore((state) => state.user);
}
