import { getSessionStorage } from '@/services/session-storage-service';
import { appConstants } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers: Headers) => {
    // Get session storage key
    const [token] = getSessionStorage(appConstants.KEYS.TOKEN, undefined);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({
    // Left empty for code-splitting
  }),
});
