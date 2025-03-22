import { api } from './api';
import { AcquisitionsResponse } from '@/types/acquisitions.type';

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcquisitions: builder.query<AcquisitionsResponse, void>({
      query: () => '/acquisitions',
    }),
  }),
});

export const { useGetAcquisitionsQuery } = userService;
