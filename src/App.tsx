import style from './App.module.scss';
import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ProductCard from './components/ProductCard/ProductCard';
import searchData from './scripts/search';
import Loader from './components/Loader/Loader';

type Elem = {
  price: number;
  title: string;
  description: string;
  thumbnail: string;
};

const App = () => {
  const [data, setData] = useState({ products: [] as Elem[] });
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
        <div className={`${style.wrapper} ${style.mainContainer}`}>
          {loading ? (
            <Loader />
          ) : data.products && data.products.length > 0 ? (
            data.products.map((el: Elem) => {
              return (
                <ProductCard
                  key={el.title}
                  title={el.title}
                  thumbnail={el.thumbnail}
                  description={el.description}
                  price={el.price}
                />
              );
            })
          ) : firstLoad ? (
            <h1></h1>
          ) : (
            <h1>No Data</h1>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
