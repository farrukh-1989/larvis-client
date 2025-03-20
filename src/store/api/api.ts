import { getSessionStorage } from '@/services/session-storage-service';
import { appConstants } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type MaybePromise<T> = T | PromiseLike<T>;

const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers: Headers): MaybePromise<void | Headers> | undefined => {
    // Get session storage key
    const [token] = getSessionStorage(appConstants.KEYS.TOKEN, undefined);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  // TODO allow configuration
  // LR-6
  baseUrl: '127.0.0.1:5173',
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({
    // Left empty for code-splitting
  }),
});
