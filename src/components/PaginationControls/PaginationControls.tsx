import styles from './PaginationControls.module.scss';
import { PaginationProps } from '../types/Types';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsPerPage } from '../../redux/perPageSlice';
import { RootState } from '../../redux/store';

const PaginationControls = (props: PaginationProps) => {
  const { page, total } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(page);

  const dispatch = useDispatch();
  const perPage = useSelector(
    (state: RootState) => state.perPage.productsPerPage
  );

  const productsPerPageChangeHandler = () => {
    setSearchParams({
      search: localStorage.getItem('prevSearch') || '',
      page: String(currentPage) || '1',
      productsPerPage: String(perPage),
    });
    dispatch(setProductsPerPage(Number(searchParams.get('productsPerPage'))));
  };

  const totalPages = total >= perPage ? Math.floor(total / perPage) : 1;

  const pageChangeHandler = (newPage: number) => {
    setSearchParams({ ...searchParams, page: String(newPage) });
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const itemsPerPageFromParams = Number(searchParams.get('productsPerPage'));
    if (!isNaN(itemsPerPageFromParams) && itemsPerPageFromParams >= 1) {
      dispatch(setProductsPerPage(itemsPerPageFromParams));
      setCurrentPage(1);
    } else {
      dispatch(setProductsPerPage(5));
      setSearchParams({ ...searchParams, page: '1', productsPerPage: '5' });
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      search: localStorage.getItem('prevSearch') || '',
      page: String(currentPage) || '1',
      productsPerPage: String(perPage) || '5',
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
          value={perPage || 5}
          onChange={(e) => dispatch(setProductsPerPage(Number(e.target.value)))}
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
          )}&productsPerPage=${perPage || 5}`}
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
          )}&productsPerPage=${perPage}`}
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
