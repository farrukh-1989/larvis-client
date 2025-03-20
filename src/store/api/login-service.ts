import { LoginParams } from '@/types/login.api.type';
import { api } from './api';
import axios from 'axios';
import { setSessionStorage } from '@/services/session-storage-service';
import { appConstants } from '@/utils/constants';

const loginService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginParams>({
      queryFn: async (args) => {
        return axios.post('/token', args).then((response) => {
          // store the token in session storage
          if (response.data && response.data.access) {
            setSessionStorage(appConstants.KEYS.TOKEN, response.data.access);
          }
          return response;
        });
      },
    }),
  }),
});

export const { useLoginMutation } = loginService;
