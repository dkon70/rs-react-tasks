import style from './ProductCard.module.scss';
import { Component } from 'react';

type DataProps = {
  title: string,
  description: string,
  price: number,
  thumbnail: string
}

class ProductCard extends Component<DataProps> {
  render() {
    return (
      <div className={style.wrapper}>
        <img className={style.image} src={this.props.thumbnail} alt={this.props.title} />
        <div className={style.textBox}>
          <h3 className={style.title}>{this.props.title} - {this.props.price}$</h3>
          <p className={style.description}>{this.props.description}</p>
        </div>
      </div>
    )
  }
}

export default ProductCard;