import style from './App.module.scss';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import searchData from './scripts/search';
import PaginationControls from './components/PaginationControls/PaginationControls';
import Main from './pages/Main/Main';
import { Elem } from './components/types/Types';
import { useSearchParams, Routes, Route } from 'react-router-dom';

const App = () => {
  const [data, setData] = useState({ products: [] as Elem[], total: 0 });
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(5);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const dataTransfer = async (value: string) => {
    setLoading(true);
    localStorage.setItem('prevSearch', value);
    const data = await searchData(
      value,
      Number(searchParams.get('productsPerPage')),
      Number(searchParams.get('page')) === 1
        ? 0
        : Number(searchParams.get('page')) *
            Number(searchParams.get('productsPerPage')) -
            Number(searchParams.get('productsPerPage'))
    );
    setData(data);
    setFirstLoad(false);
    setLoading(false);
  };

  if (error) {
    throw new Error('Error');
  }

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPageHandler = () => {
    if (data.total / productsPerPage > page) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dataTransfer(localStorage.getItem('prevSearch') || '');
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      search: localStorage.getItem('prevSearch') || '',
      page: searchParams.get('page') || '1',
      productsPerPage: searchParams.get('productsPerPage') || '5',
    });
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={style.wrapper}>
          <SearchBar dataTransfer={dataTransfer} />
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
            total={data.total}
          />
        </div>
        <div className={`${style.wrapper} ${style.mainContainer}`}>
          <Routes>
            <Route
              path="/"
              element={
                <Main data={data} loading={loading} firstLoad={firstLoad} />
              }
            />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default App;
