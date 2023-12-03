import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FormData = {
  name: string;
  age: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  file: string | null;
};

export type FormState = {
  form2Data: FormData[];
};

const initialState: FormState = {
  form2Data: [],
};

const form2Slice = createSlice({
  name: 'form2',
  initialState,
  reducers: {
    setForm2Data: (state, action: PayloadAction<FormData>) => {
      state.form2Data.push(action.payload);
    },
  },
});

export default form2Slice;
