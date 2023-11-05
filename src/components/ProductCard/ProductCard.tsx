import style from './ProductCard.module.scss';
import { DataProps } from '../types/Types';
import { Link } from 'react-router-dom';

const ProductCard = (props: DataProps) => {
  return (
    <>
      <Link to={`/${props.id}`}>
        <div className={style.wrapper}>
          <img
            className={style.image}
            src={props.thumbnail}
            alt={props.title}
          />
          <div className={style.textBox}>
            <h3 className={style.title}>
              {props.title} - {props.price}$
            </h3>
            <p className={style.description}>{props.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
