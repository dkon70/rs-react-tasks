import style from './ProductPage.module.scss';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getItem from '../../scripts/getItem';
import Loader from '../Loader/Loader';
import { DataProps } from '../types/Types';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({} as DataProps);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getItem(Number(id));
        setDetails(details);
        setLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [id]);

  const closePage = () => {
    navigate(
      `/?search=${searchParams.get('search') || ''}&page=${
        searchParams.get('page') || '1'
      }&productsPerPage=${searchParams.get('productsPerPage') || '5'}`
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.wrapper}>
          <img src={details.thumbnail} alt={details.title} />
          <h1>{details.title}</h1>
          <p>{details.description}</p>
          <p>{details.price}</p>
          <button onClick={closePage}>Close</button>
        </div>
      )}
    </>
  );
};

export default ProductPage;
