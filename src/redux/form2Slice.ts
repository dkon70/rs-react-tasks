import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form2SliceData, Form2SliceState } from '../utils/types';

const initialState: Form2SliceState = {
  form2Data: [],
};

const form2Slice = createSlice({
  name: 'form2',
  initialState,
  reducers: {
    setForm2Data: (state, action: PayloadAction<Form2SliceData>) => {
      state.form2Data.push(action.payload);
    },
  },
});

export default form2Slice;
