import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Data, Elem } from '@/components/types/Types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (build) => ({
    getProduct: build.query<
      Data,
      { name: string; limit: number; skip: number }
    >({
      query: ({ name, limit, skip }) =>
        `/search?q=${name}&limit=${limit}&skip=${skip}`,
    }),
    getItem: build.query<Elem, { id: number }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});

export type RootState = ReturnType<typeof api.reducer>;
export const {
  useGetProductQuery,
  useGetItemQuery,
  util: { getRunningQueriesThunk },
} = api;
export const { getProduct, getItem } = api.endpoints;
