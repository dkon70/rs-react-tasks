import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PerPageState = {
  productsPerPage: number;
};

const productsPerPageInitialState: PerPageState = {
  productsPerPage: 5,
};

const perPageSlice = createSlice({
  name: 'perPage',
  initialState: productsPerPageInitialState,
  reducers: {
    setProductsPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
    },
  },
});

export const { setProductsPerPage } = perPageSlice.actions;
export default perPageSlice.reducer;
