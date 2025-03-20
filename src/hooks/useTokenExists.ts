import { getSessionStorage } from '@/services/session-storage-service';
import { isStringValid } from '@/utils/common';
import { appConstants, AppRoutes } from '@/utils/constants';
import { Navigate } from 'react-router';

export const useTokenExists = () => {
  const windowLocation = window.location.pathname;

  const [token] = getSessionStorage(appConstants.KEYS.TOKEN, undefined);

  if (windowLocation === AppRoutes.login && isStringValid(token)) {
    Navigate({ to: AppRoutes.dashboard });
  }
};
