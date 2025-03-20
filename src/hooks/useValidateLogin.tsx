import { getSessionStorage } from '@/services/session-storage-service';
import { appConstants, AppRoutes } from '@/utils/constants';
import { Navigate } from 'react-router';

export const useValidateLogin = () => {
  const [token] = getSessionStorage(appConstants.KEYS.TOKEN, undefined);

  if (!token) {
    Navigate({ to: AppRoutes.login });
  }
};
