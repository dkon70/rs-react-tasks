export type Elem = {
  price: number;
  title: string;
  description: string;
  thumbnail: string;
}

export type PaginationProps = {
  prevPage(): void;
  nextPage(): void;
  productsPerPage(e: React.ChangeEvent<HTMLInputElement>): void;
  page: number;
  products: number;
}

export type MainProps = {
  loading: boolean;
  data: {products: Elem[], total: number};
  firstLoad: boolean;
}

export type SearchProps = {
  dataTransfer: (value: string) => void;
}

export type DataProps = {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}
