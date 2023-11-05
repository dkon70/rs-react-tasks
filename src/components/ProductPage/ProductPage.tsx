import style from './ProductPage.module.scss';
import { ProductPageProps } from '../types/Types';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getItem from '../../scripts/getItem';
import Loader from '../Loader/Loader';

const ProductPage = (props: ProductPageProps) => {
  const {thumbnail, title, description, price} = props;
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [loading] = useState(true);
  const [, setDetails] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getItem(Number(itemId));
        setDetails(details);
      } catch (error) {
        throw new Error;
      }
    }

    fetchData();

  }, [itemId]);

  const closePage = () => {
    navigate('/');
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className={style.wrapper}>
      <img src={thumbnail} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={closePage}>Close</button>
    </div>
  );
};

export default ProductPage;
