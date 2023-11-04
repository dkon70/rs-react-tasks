import style from './App.module.scss';
import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import searchData from './scripts/search';
import PaginationControls from './components/PaginationControls/PaginationControls';
import Main from './pages/Main/Main';
import { Elem } from './components/types/Types';


const App = () => {
  const [data, setData] = useState({ products: [] as Elem[], total: 0 });
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  const dataTransfer = async (value: string) => {
    setLoading(true);
    localStorage.setItem('prevSearch', value);
    const data = await searchData(value);
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
  }

  const nextPageHandler = () => {
    if (data.total / productsPerPage > page) {
      setPage(page + 1);
    }
  }

  const productsPerPageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductsPerPage(Number(e.target.value));
    console.log(e.target.value);
  }

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
          <PaginationControls prevPage={prevPageHandler} nextPage={nextPageHandler} page={page} productsPerPage={productsPerPageHandler} products={productsPerPage} />
        </div>
        <div className={`${style.wrapper} ${style.mainContainer}`}>
          <Main data={data} loading={loading} firstLoad={firstLoad} />
        </div>
      </main>
    </>
  );
};

export default App;
