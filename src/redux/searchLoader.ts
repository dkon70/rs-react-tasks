import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  loader: boolean;
};

const searchLoaderInitialState: SearchState = {
  loader: true,
};

const searchLoader = createSlice({
  name: 'searchLoader',
  initialState: searchLoaderInitialState,
  reducers: {
    setSearchLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
  },
});

export const { setSearchLoader } = searchLoader.actions;
export default searchLoader.reducer;
