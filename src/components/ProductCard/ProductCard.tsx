import style from './ProductCard.module.scss';
import { DataProps } from '../types/Types';
import Image from 'next/image';

const ProductCard = (props: DataProps) => {
  return (
    <>
      <div className={style.wrapper} data-testid="card">
        <Image
          className={style.image}
          src={props.thumbnail}
          alt={props.title}
          width={350}
          height={200}
        />
        <div className={style.textBox}>
          <h3 className={style.title}>
            {props.title} - {props.price}$
          </h3>
          <p className={style.description}>{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
