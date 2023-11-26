import style from '../styles/404.module.scss';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.responseCode}>404</h1>
      <h2 className={style.heading}>Not found...</h2>
      <Link href="/">
        <button className={style.button}>To main page</button>
      </Link>
    </div>
  );
};

export default NotFound;
