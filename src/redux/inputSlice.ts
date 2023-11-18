import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InputState = {
  inputContext: string;
};

const inputInitialState: InputState = {
  inputContext: localStorage.getItem('prevSearch') || '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState: inputInitialState,
  reducers: {
    setInputContext: (state, action: PayloadAction<string>) => {
      state.inputContext = action.payload;
    },
  },
});

export const { setInputContext } = inputSlice.actions;
export default inputSlice.reducer;
