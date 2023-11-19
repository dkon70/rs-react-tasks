import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductState = {
  loader: boolean;
};

const productLoaderInitialState: ProductState = {
  loader: true,
};

const productLoader = createSlice({
  name: 'productLoader',
  initialState: productLoaderInitialState,
  reducers: {
    setProductLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
  },
});

export const { setProductLoader } = productLoader.actions;
export default productLoader.reducer;
