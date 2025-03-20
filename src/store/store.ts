import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import { setupListeners } from '@reduxjs/toolkit/query';

/**
 * Configure store for rtk-query
 * This can be expanded for application context
 */
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
});

setupListeners(store.dispatch);

// Documentation https://redux-toolkit.js.org/tutorials/quick-start
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
