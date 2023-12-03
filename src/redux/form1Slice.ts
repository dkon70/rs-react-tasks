import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form1SliceData, Form1SliceState } from '../utils/types';

const initialState: Form1SliceState = {
  form1Data: [],
};

const form1Slice = createSlice({
  name: 'form1',
  initialState,
  reducers: {
    setForm1Data: (state, action: PayloadAction<Form1SliceData>) => {
      state.form1Data.push(action.payload);
    },
  },
});

export default form1Slice;
