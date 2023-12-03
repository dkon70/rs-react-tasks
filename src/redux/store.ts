import { configureStore } from '@reduxjs/toolkit';
import form1Slice from './form1Slice';
import form2Slice from './form2Slice';

const store = configureStore({
  reducer: {
    form1: form1Slice.reducer,
    form2: form2Slice.reducer,
  },
});

export default store;
export const { setForm1Data } = form1Slice.actions;
export const { setForm2Data } = form2Slice.actions;
export type RootState = ReturnType<typeof store.getState>;
