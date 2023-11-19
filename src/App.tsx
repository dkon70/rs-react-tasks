import style from './App.module.scss';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import PaginationControls from './components/PaginationControls/PaginationControls';
import Main from './pages/Main/Main';
import {
  useSearchParams,
  Outlet,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInputContext } from './redux/inputSlice';
import { RootState } from './redux/store';
import { useGetProductQuery } from './redux/api';
import { setSearchLoader } from './redux/searchLoader';

const App = () => {
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(5);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const inputContext = useSelector(
    (state: RootState) => state.input.inputContext
  );

  const { data, refetch, isFetching } = useGetProductQuery({
    name: inputContext,
    limit: Number(searchParams.get('productsPerPage')) || 5,
    skip:
      Number(searchParams.get('page')) === 1
        ? 0
        : Number(searchParams.get('page')) *
            Number(searchParams.get('productsPerPage')) -
          Number(searchParams.get('productsPerPage')),
  });

  const { products = [], total = 0 } = data || {};

  useEffect(() => {
    refetch();
  }, [searchParams.get('productsPerPage'), searchParams.get('search')]);

  useEffect(() => {
    dispatch(setSearchLoader(isFetching));
  }, [isFetching]);

  if (error) {
    throw new Error('Error');
  }

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPageHandler = () => {
    if (data && data.total / productsPerPage > page) {
      setPage(page + 1);
    }
  };

  const closeOnClick = () => {
    if (id) {
      navigate(
        `/?search=${searchParams.get('search') || ''}&page=${
          searchParams.get('page') || '1'
        }&productsPerPage=${searchParams.get('productsPerPage') || '5'}`
      );
    }
  };

  useEffect(() => {
    if (searchParams.has('search')) {
      localStorage.setItem(
        'prevSearch',
        String(searchParams.get('search') || '')
      );

      dispatch(setInputContext(String(searchParams.get('search') || '')));
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      search: localStorage.getItem('prevSearch') || '',
      page: searchParams.get('page') || '1',
      productsPerPage: searchParams.get('productsPerPage') || '5',
    });
  }, []);

  return (
    <div className={style.app}>
      <div
        className={`${style.mainApp} ${id ? style.split : ''}`}
        onClick={closeOnClick}
      >
        <header className={style.header}>
          <div className={style.wrapper}>
            <SearchBar />
          </div>
        </header>
        <main className={style.main}>
          <div className={style.buttonWrapper}>
            <button
              className={style.errorButton}
              onClick={() => {
                setError(true);
              }}
            >
              Error
            </button>
          </div>
          <div className={style.pagination}>
            <PaginationControls
              prevPage={prevPageHandler}
              nextPage={nextPageHandler}
              page={currentPage}
              products={productsPerPage}
              total={total}
            />
          </div>
          <div className={`${style.wrapper} ${style.mainContainer}`}>
            <Main loading={isFetching} data={{ products, total }} />
          </div>
        </main>
        {id ? <div className={style.shadow}></div> : ''}
      </div>
      {id ? (
        <div className={`${style.outlet} ${id ? style.split : ''}`}>
          <Outlet />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
