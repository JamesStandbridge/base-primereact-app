import { AuthService } from '../../generated/services/AuthService';
import { UserInDB } from '../../generated/models/UserInDB';
import { useApiQuery, QueryOptions } from '../useApi';

// Hook pour récupérer les informations de l'utilisateur courant
export function useGetCurrentUser(options?: QueryOptions<UserInDB>) {
  return useApiQuery<UserInDB>(['currentUser'], () => AuthService.readUsersMeApiOptiboisV1AuthUsersMeGet(), options);
}
