import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import perPageReducer from './perPageSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    perPage: perPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
