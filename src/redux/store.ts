import { configureStore } from '@reduxjs/toolkit';
import form1Slice from './form1Slice';

const store = configureStore({
  reducer: {
    form1: form1Slice.reducer,
  },
});

export default store;
export const { setForm1Data } = form1Slice.actions;
export type RootState = ReturnType<typeof store.getState>;