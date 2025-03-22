export type Users = {
  user_id: string;
  name: string;
};

export type UsersResponse = Array<Users>;

export type UpdateUser = {
  user_id: string;
  name: string;
  password: string;
};

export interface UpdateUserResponse extends Users {
  password: string;
}

export type GetUserArgs = {
  user_id: string;
};

export type GetUserResponse = {
  name: string;
  password: string;
};
