import { api } from './api';
import { AcquisitionsResponse } from '@/types/acquisitions.type';

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcquisitions: builder.query<AcquisitionsResponse, void>({
      query: () => '/acquisitions',
      transformResponse: (response: AcquisitionsResponse) => {
        const sorted = response.sort((a, b) => a.timestamp - b.timestamp);
        return sorted;
      },
    }),
  }),
});

export const { useGetAcquisitionsQuery } = userService;
