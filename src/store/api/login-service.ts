import { LoginParams, LoginResponse } from '@/types/login.api.type';
import { api } from './api';
import { setSessionStorage } from '@/services/session-storage-service';
import { appConstants } from '@/utils/constants';

const loginService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: (body) => ({
        url: '/token',
        method: 'POST',
        body,
      }),
      transformResponse: (res: LoginResponse) => {
        if (res.access) {
          setSessionStorage(appConstants.KEYS.TOKEN, res.access);
        }
        return {
          access: res?.access,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = loginService;
