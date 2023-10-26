import style from './Main.module.scss';
import { Component } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

class Main extends Component {
  render() {
    return (
      <main className={style.main}>
        <div className={style.wrapper}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
    )
  }
}

export default Main;