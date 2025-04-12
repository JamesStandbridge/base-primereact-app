import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { OpenAPI } from '../generated/core/OpenAPI';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

// API configuration
OpenAPI.BASE = import.meta.env.VITE_API_URL || 'http://localhost:5005';
OpenAPI.WITH_CREDENTIALS = true;

// Default Axios headers configuration
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor to add token to requests
axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Headers configuration for OpenAPI
OpenAPI.HEADERS = {
  'Content-Type': 'application/json',
};

// Types for query options
export type QueryOptions<TData> = Omit<UseQueryOptions<TData, Error, TData, QueryKey>, 'queryKey' | 'queryFn'>;

// Types for mutation options
export type MutationOptions<TData, TVariables> = Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>;

// Generic hook for GET requests
export function useApiQuery<TData>(queryKey: QueryKey, queryFn: () => Promise<TData>, options?: QueryOptions<TData>) {
  return useQuery<TData, Error>({
    queryKey,
    queryFn,
    ...options,
  });
}

// Generic hook for mutations
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData, TVariables>,
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    ...options,
  });
}
