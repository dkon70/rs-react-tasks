import styles from './PaginationControls.module.scss';
import { PaginationProps } from '../types/Types';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const PaginationControls = (props: PaginationProps) => {
  const router = useRouter();
  const { page, total, nextPage, prevPage } = props;
  const [currentPage, setCurrentPage] = useState(page);

  const perPage = 5;

  const pageChangeHandler = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    router.query.page = String(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <h3>Items per page:</h3>
        <input
          type="number"
          min={1}
          max={100}
          value={perPage || 5}
          onChange={(e) => ''}
        />
        <button className={styles.button}>Submit</button>
      </div>
      <div className={styles.page}>
        <button onClick={prevPage} className={styles.button}>
          prev
        </button>

        <p className={styles.pageNumber}>{page}</p>

        <button onClick={nextPage} className={styles.button}>
          next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
