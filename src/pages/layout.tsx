import styles from '@/styles/Home.module.scss';
import SearchBar from '@/components/SearchBar/SearchBar';
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import Main from '@/components/Main/Main';
import { Data } from '@/components/types/Types';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Elem } from '@/components/types/Types';

const Layout = ({
  data,
  children,
}: {
  data: Data | Elem;
  children?: ReactNode;
}) => {
  const router = useRouter();
  const productData = data as Data;

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: '/',
      query: {
        search: router.query.search || '',
        page: String(newPage),
        productsPerPage: String(router.query.productsPerPage) || '5',
      },
    });
  };

  const nextPageHandler = () => {
    const nextPage = Number(router.query.page) + 1;
    if (nextPage <= productData.total / Number(router.query.productsPerPage)) {
      handlePageChange(nextPage);
    }
  };

  const prevPageHandler = () => {
    const prevPage = Number(router.query.page) - 1;
    if (prevPage >= 1) {
      handlePageChange(prevPage);
    }
  };

  const closeSideOnClickHandler = () => {
    router.replace({
      pathname: '/',
      query: {
        search: router.query.search,
        page: router.query.page,
        productsPerPage: router.query.productsPerPage,
      },
    });
  };

  return (
    <div className={styles.app}>
      <div
        className={`${styles.mainApp} ${router.query.id ? styles.split : ''}`}
      >
        <div
          className={`${styles.mainApp} ${router.query.id ? styles.split : ''}`}
        >
          <header className={styles.header}>
            <div className={styles.wrapper}>
              <SearchBar />
            </div>
          </header>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.errorButton}
              onClick={() => {
                throw new Error('ErrorBoudnary');
              }}
            >
              Error
            </button>
          </div>
          <div className={styles.pagination}>
            <PaginationControls
              prevPage={prevPageHandler}
              nextPage={nextPageHandler}
              page={Number(router.query.page) || 1}
              total={productData.total || 0}
              products={Number(router.query.productsPerPage)}
              productsPerPage={Number(router.query.productsPerPage)}
            />
          </div>
          <div className={`${styles.wrapper} ${styles.mainContainer}`}>
            <Main data={{ products: productData.products || [] }} />
          </div>
          {router.query.id ? (
            <div
              onClick={closeSideOnClickHandler}
              className={styles.shadow}
            ></div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.outlet}>{children}</div>
    </div>
  );
};

export default Layout;
