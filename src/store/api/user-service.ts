import { api } from './api';
import { GetUserArgs, GetUserResponse, UpdateUser, UpdateUserResponse, UsersResponse } from '@/types/users.api.type';

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => '/users',
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUser>({
      query: (args) => {
        const { user_id, ...rest } = args;

        return {
          method: 'POST',
          url: `/users/${user_id?.toLowerCase()}`,
          body: rest,
        };
      },
    }),
    getUser: builder.query<GetUserResponse, GetUserArgs>({
      query: (args) => `/users/${args.user_id}`,
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation, useGetUserQuery, useLazyGetUserQuery } = userService;
