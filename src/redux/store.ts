import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import perPageReducer from './perPageSlice';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import searchLoaderReducer from './searchLoader';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    perPage: perPageReducer,
    [api.reducerPath]: api.reducer,
    searchLoader: searchLoaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
