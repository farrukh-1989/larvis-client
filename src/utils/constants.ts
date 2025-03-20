type CONSTANTS = {
  KEYS: {
    TOKEN: string;
  };
};

export const appConstants: CONSTANTS = {
  KEYS: {
    TOKEN: 'access_token',
  },
};

export enum AppRoutes {
  login = '/',
  dashboard = '/dashboard',
}
