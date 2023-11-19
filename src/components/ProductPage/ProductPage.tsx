import style from './ProductPage.module.scss';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useGetItemQuery } from '../../redux/api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductLoader } from '../../redux/productLoader';
import { RootState } from '../../redux/store';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data, isFetching } = useGetItemQuery({ id: Number(id) });

  const closePage = () => {
    navigate(
      `/?search=${searchParams.get('search') || ''}&page=${
        searchParams.get('page') || '1'
      }&productsPerPage=${searchParams.get('productsPerPage') || '5'}`
    );
  };

  const dispatch = useDispatch();
  const productLoader = useSelector(
    (state: RootState) => state.productLoader.loader
  );

  useEffect(() => {
    dispatch(setProductLoader(isFetching));
  }, [isFetching]);

  useEffect(() => {
    console.log(productLoader);
  }, [productLoader]);

  return (
    <>
      {productLoader ? (
        <Loader />
      ) : data ? (
        <div className={style.wrapper}>
          <img src={data.thumbnail} alt={data.title} />
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>{data.price}$</p>
          <button onClick={closePage}>Close</button>
        </div>
      ) : (
        <h3>No data...</h3>
      )}
    </>
  );
};

export default ProductPage;
