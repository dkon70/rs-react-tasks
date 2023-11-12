import style from './ProductCard.module.scss';
import { DataProps } from '../types/Types';
import { Link, useSearchParams } from 'react-router-dom';

const ProductCard = (props: DataProps) => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <Link
        to={`/${props.id}?search=${searchParams.get('search') || ''}&page=${
          searchParams.get('page') || '1'
        }&productsPerPage=${searchParams.get('productsPerPage') || '5'}`}
        className={style.link}
      >
        <div className={style.wrapper} data-testid="card">
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
