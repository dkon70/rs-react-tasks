import style from './ProductCard.module.scss';
import { Component } from 'react';

const data = {
  title: "Samsung Galaxy Book",
  description: "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
  price: 1499,
  img: "https://i.dummyjson.com/data/products/7/thumbnail.jpg"

}

class ProductCard extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <img className={style.image} src={data.img} alt={data.title} />
        <div className={style.textBox}>
          <h3 className={style.title}>{data.title} - {data.price}$</h3>
          <p className={style.description}>{data.description}</p>
        </div>
      </div>
    )
  }
}

export default ProductCard;