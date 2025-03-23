import { LoginParams, LoginResponse } from '@/types/login.api.type';
import { api } from './api';
import { setSessionStorage } from '@/services/session-storage-service';
import { appConstants, AppRoutes } from '@/utils/constants';
import { NotificationInstance } from 'antd/es/notification/interface';
import { NavigateFunction } from 'react-router';
import i18n from '@/i18n';

type Extension = {
  notiApi: NotificationInstance;
  n: NavigateFunction;
};

const loginService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginParams & Extension>({
      query: (body) => {
        const { notiApi, n, ...rest } = body;
        return {
          url: '/token',
          method: 'POST',
          body: rest,
        };
      },
      transformResponse: (res: LoginResponse) => {
        if (res.access) {
          setSessionStorage(appConstants.KEYS.TOKEN, res.access);
        }
        return {
          access: res?.access,
        };
      },
      onQueryStarted: async (args, { queryFulfilled }) => {
        queryFulfilled
          .then((res) => {
            args.n(AppRoutes.dashboard);
          })
          .catch(() => {
            args.notiApi.error({
              message: i18n.t('login.invalid-credentials'),
              description: i18n.t('login.invalid-credentials-description'),
            });
          });
      },
    }),
  }),
});

export const { useLoginMutation } = loginService;
