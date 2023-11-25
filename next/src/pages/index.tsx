import styles from '@/styles/Home.module.scss';
import SearchBar from '@/components/SearchBar/SearchBar';
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import Main from '@/components/Main/Main';
import { Elem } from '@/components/types/Types';
import { useGetProductQuery } from './api/api';
import { api } from './api/api';
import { RootState } from './api/api';
import { Data } from '@/components/types/Types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { wrapper } from './api/store';
import { getProduct } from './api/api';
import { store } from './api/store';
import { getRunningQueriesThunk } from './api/api';
import { useRouter } from 'next/router';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { data } = await store.dispatch(
      getProduct.initiate({
        name: '',
        limit: Number(context.query.productsPerPage) || 5,
        skip: Number(context.query.page)
          ? Number(context.query.page) === 1
            ? 0
            : Number(context.query.page) *
                Number(context.query.productsPerPage) -
              Number(context.query.productsPerPage)
          : 0 || 0,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data },
    };
  }
);

export default function Home({ data }: { data: Data }) {
  const router = useRouter();
  const [page, setPage] = useState(router.query.page || 1);
  const [productsPerPage] = useState(
    router.query.productsPerPage || 5
  );

  useEffect(() => {
    router.push({
      pathname: '/',
      query: {
        search: '',
        page: String(page),
        productsPerPage: router.query.productsPerPage || String(productsPerPage),
      },
    });
  }, [page, productsPerPage]);

  const nextPageHandler = () => {
    if (Number(page) < data.total / Number(productsPerPage)) {
      setPage(String(Number(page) + 1));
    }
  };

  const prevPageHandler = () => {
    if (Number(page) > 1) {
      setPage(String(Number(page) - 1));
    }
  };

  useEffect(() => {
    router.push({
      pathname: '/',
      query: { search: '', page: page, productsPerPage: productsPerPage },
    });
  }, []);

  const isFetching = false;
  const total = 5;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <SearchBar />
        </div>
      </header>
      <div className={styles.pagination}>
        <PaginationControls
          prevPage={prevPageHandler}
          nextPage={nextPageHandler}
          page={Number(router.query.page)}
          total={data.total}
          products={Number(router.query.productsPerPage)}
          productsPerPage={Number(router.query.productsPerPage)}
        />
      </div>
      <div className={`${styles.wrapper} ${styles.mainContainer}`}>
        <Main
          loading={isFetching}
          data={{ products: data.products || [], total }}
        />
      </div>
    </>
  );
}
