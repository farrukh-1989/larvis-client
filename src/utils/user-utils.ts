import { GetUserResponse } from '@/types/users.api.type';

import i18n from '../i18n';

export type PwdValid = {
  valid?: boolean;
  reason?: string;
};

export const isPwdChangeValid = (oldPwd: string, user?: GetUserResponse): PwdValid => {
  if (oldPwd !== user?.password) {
    return {
      valid: false,
      reason: i18n.t('users.old-pwd-match'),
    };
  }

  return {
    valid: true,
  };
};
