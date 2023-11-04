import style from './ProductCard.module.scss';
import { DataProps } from '../types/Types';

const ProductCard = (props: DataProps) => {
  return (
    <div className={style.wrapper}>
      <img className={style.image} src={props.thumbnail} alt={props.title} />
      <div className={style.textBox}>
        <h3 className={style.title}>
          {props.title} - {props.price}$
        </h3>
        <p className={style.description}>{props.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
