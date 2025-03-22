import axios from 'axios';
import { api } from './api';
import { GetUserArgs, GetUserResponse, UpdateUser, UpdateUserResponse, UsersResponse } from '@/types/users.api.type';

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      queryFn: async () => {
        return axios.get('/users').then((response) => {
          return response;
        });
      },
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUser>({
      queryFn: async (args) => {
        const { user_id, ...rest } = args;
        return axios.post(`/users/${args.user_id}`, rest);
      },
    }),
    getUser: builder.query<GetUserResponse, GetUserArgs>({
      queryFn: async (args) => {
        return axios.get(`/users/${args.user_id}`);
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation, useGetUserQuery } = userService;
