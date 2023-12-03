import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormData = {
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

interface FormState {
  form1Data: FormData[];
}

const initialState: FormState = {
  form1Data: [],
};

const form1Slice = createSlice({
  name: 'form1',
  initialState,
  reducers: {
    setForm1Data: (state, action: PayloadAction<FormData>) => {
      state.form1Data.push(action.payload);
    },
  },
});

export default form1Slice;
