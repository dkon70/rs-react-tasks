import styles from './PaginationControls.module.scss';
import { PaginationProps } from '../types/Types';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

const PaginationControls = (props: PaginationProps) => {
  const router = useRouter();
  const { page, total, nextPage, prevPage, productsPerPage } = props;
  const [perPage, setPerPage] = useState(productsPerPage || 5);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPerPage(Number(e.target.value));
  };

  const perPageHandler = () => {
    router.push({
      pathname: '/',
      query: {
        search: router.query.search,
        page: router.query.page,
        productsPerPage: perPage,
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <h3>Items per page:</h3>
        <input
          type="number"
          min={1}
          max={100}
          value={perPage}
          onChange={changeHandler}
        />
        <button onClick={perPageHandler} className={styles.button}>
          Submit
        </button>
      </div>
      <div className={styles.page}>
        <button
          onClick={prevPage}
          className={`${styles.button} ${page === 1 ? styles.disabled : ''}`}
        >
          prev
        </button>

        <p className={styles.pageNumber}>{page || 1}</p>

        <button
          onClick={nextPage}
          className={`${styles.button} ${
            page === total / Number(router.query.productsPerPage)
              ? styles.disabled
              : ''
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
