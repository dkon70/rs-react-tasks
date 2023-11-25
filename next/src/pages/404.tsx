import style from '../styles/404.module.scss';
import Link from 'next/link';
// import { Link } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const NotFound = () => {
  // const [searchParams] = useSearchParams();

  return (
    <div className={style.wrapper}>
      <h1 className={style.responseCode}>404</h1>
      <h2 className={style.heading}>Not found...</h2>
      {/* <Link
        to={`/?search=${searchParams.get('search') || ''}&page=${
          searchParams.get('page') || '1'
        }&productsPerPage=${searchParams.get('productsPerPage') || '5'}`}
      >
        <button className={style.button}>To main page</button>
      </Link> */}
      <Link href="/">
        <button className={style.button}>To main page</button>
      </Link>
    </div>
  );
};

export default NotFound;
