import styles from '@/styles/Home.module.scss';
import SearchBar from '@/components/SearchBar/SearchBar';
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import Main from '@/components/Main/Main';
import { Data } from '@/components/types/Types';
import { useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Elem } from '@/components/types/Types';

const Layout = ({
  data,
  children,
}: {
  data: Data | Elem;
  children: ReactNode;
}) => {
  const router = useRouter();
  const productData = data as Data;
  const [page, setPage] = useState(router.query.page || 1);
  const [productsPerPage] = useState(router.query.productsPerPage || 5);

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
    router.push({
      pathname: '/',
      query: {
        search: router.query.search || '',
        page: String(newPage),
        productsPerPage: String(productsPerPage),
      },
    });
  };

  const nextPageHandler = () => {
    const nextPage = Number(page) + 1;
    if (nextPage <= productData.total / Number(productsPerPage)) {
      handlePageChange(nextPage);
    }
  };

  const prevPageHandler = () => {
    const prevPage = Number(page) - 1;
    if (prevPage >= 1) {
      handlePageChange(prevPage);
    }
  };

  const isFetching = false;

  return (
    <div className={styles.app}>
      <div
        className={`${styles.mainApp} ${router.query.id ? styles.split : ''}`}
      >
        <header className={styles.header}>
          <div className={styles.wrapper}>
            <SearchBar />
          </div>
        </header>
        <div className={styles.pagination}>
          <PaginationControls
            prevPage={prevPageHandler}
            nextPage={nextPageHandler}
            page={Number(router.query.page) || 1}
            total={productData.total}
            products={Number(router.query.productsPerPage)}
            productsPerPage={Number(router.query.productsPerPage)}
          />
        </div>
        <div className={`${styles.wrapper} ${styles.mainContainer}`}>
          <Main
            loading={isFetching}
            data={{ products: productData.products || [] }}
          />
        </div>
      </div>
      <div className={styles.outlet}>{children}</div>
    </div>
  );
};

export default Layout;
