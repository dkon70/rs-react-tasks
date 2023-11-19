import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Data } from '../components/types/Types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products/' }),
  endpoints: (builder) => ({
    getProduct: builder.query<
      Data,
      { name: string; limit: number; skip: number }
    >({
      query: ({ name, limit, skip }) =>
        `search?q=${name}&limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useGetProductQuery } = api;
