import { ReactNode } from 'react';

export type Elem = {
  id: number;
  price: number;
  title: string;
  description: string;
  thumbnail: string;
};

export type PaginationProps = {
  prevPage(): void;
  nextPage(): void;
  page: number;
  products: number;
  total: number;
};

export type MainProps = {
  data?: { products: Elem[]; total: number };
  firstLoad: boolean;
  loading: boolean;
};

export type SearchProps = {
  dataTransfer: (value: string) => void;
};

export type DataProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error | null;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type AppContextType = {
  dataContext: Data;
  setDataContext: React.Dispatch<React.SetStateAction<Data>>;
};

export type AppProviderProps = {
  children: ReactNode;
};

export type Data = {
  products: Elem[];
  total: number;
};
