import styles from './PaginationControls.module.scss';
import { PaginationProps } from '../types/Types';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PaginationControls = (props: PaginationProps) => {
  const { page, products, total } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(page);

  const [itemsPerPageValue, setItemsPerPageValue] = useState(products);

  const productsPerPageChangeHandler = () => {
    setSearchParams({
      search: localStorage.getItem('prevSearch') || '',
      page: String(currentPage) || '1',
      productsPerPage: String(itemsPerPageValue) || '5',
    });
  };

  const totalPages =
    total >= itemsPerPageValue ? Math.floor(total / itemsPerPageValue) : 1;

  const pageChangeHandler = (newPage: number) => {
    setSearchParams({ ...searchParams, page: String(newPage) });
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const itemsPerPageFromParams = Number(searchParams.get('productsPerPage'));
    if (!isNaN(itemsPerPageFromParams) && itemsPerPageFromParams >= 1) {
      setItemsPerPageValue(itemsPerPageFromParams);
      setCurrentPage(1);
    } else {
      setItemsPerPageValue(5);
      setSearchParams({ ...searchParams, page: '1', productsPerPage: '5' });
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      search: localStorage.getItem('prevSearch') || '',
      page: String(currentPage) || '1',
      productsPerPage: String(itemsPerPageValue) || '5',
    });
  }, [localStorage.getItem('prevSearch')]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <h3>Items per page:</h3>
        <input
          type="number"
          min={1}
          max={100}
          value={itemsPerPageValue || 5}
          onChange={(e) => setItemsPerPageValue(Number(e.target.value))}
        />
        <button
          className={styles.button}
          onClick={productsPerPageChangeHandler}
        >
          Submit
        </button>
      </div>
      <div className={styles.page}>
        <Link
          to={`/?search=${searchParams.get('search') || ''}&page=${Math.max(
            1,
            page - 1
          )}&productsPerPage=${itemsPerPageValue || 5}`}
          className={`${styles.button} ${styles.buttonPrev} ${
            page === 1 ? styles.disabled : ''
          }`}
          onClick={() => pageChangeHandler(Math.max(1, page - 1))}
        >
          prev
        </Link>
        <p className={styles.pageNumber}>{page}</p>
        <Link
          to={`/?search=${searchParams.get('search') || ''}&page=${Math.min(
            totalPages,
            page + 1
          )}&productsPerPage=${itemsPerPageValue}`}
          className={`${styles.button} ${styles.buttonNext} ${
            page === totalPages ? styles.disabled : ''
          }`}
          onClick={() => pageChangeHandler(Math.min(totalPages, page + 1))}
          data-testid="nextButton"
        >
          next
        </Link>
      </div>
    </div>
  );
};

export default PaginationControls;
