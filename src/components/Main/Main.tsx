import { Link } from 'react-router-dom';
import style from './Main.module.scss';

const Main = () => {
  return (
    <div className={style.wrapper}>
      <Link to="/form1" className={style.link}>
        Form 1
      </Link>
      <Link to="/form2" className={style.link}>
        Form 2
      </Link>
    </div>
  );
};

export default Main;
