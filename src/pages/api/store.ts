import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

type Store = typeof store;

export const { dispatch, getState } = store;
const makeStore: MakeStore<Store> = () => store;
export type AppDispatch = Store['dispatch'];
export const wrapper = createWrapper<Store>(makeStore, { debug: true });
