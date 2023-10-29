import style from './App.module.scss';
import { Component } from 'react';
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

type Data = {
  products: Elem[];
};

class App extends Component {
  state = {
    searchValue: '',
    data: { products: [] },
    firstLoad: true,
    error: false,
    loading: true,
  };

  dataTransfer = async (value: string) => {
    this.setState({ searchValue: value, loading: true });
    localStorage.setItem('prevSearch', value);
    const data: Data = await searchData(value);
    this.setState({ data: data, firstLoad: false, loading: false });
  };

  render() {
    if (this.state.error) {
      throw new Error('Error');
    }

    return (
      <>
        <header className={style.header}>
          <div className={style.wrapper}>
            <SearchBar dataTransfer={this.dataTransfer} />
          </div>
        </header>
        <main className={style.main}>
          <div className={style.buttonWrapper}>
            <button
              className={style.errorButton}
              onClick={() => {
                this.setState({ error: true });
              }}
            >
              Error
            </button>
          </div>
          <div className={`${style.wrapper} ${style.mainContainer}`}>
            {this.state.loading ? (
              <Loader />
            ) : this.state.data.products &&
              this.state.data.products.length > 0 ? (
              this.state.data.products.map((el: Elem) => {
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
            ) : this.state.firstLoad ? (
              <h1></h1>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </main>
      </>
    );
  }
}

export default App;
