import { Link } from 'react-router-dom';
import style from './Main.module.scss';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';

const Main = () => {
  // const form1Data = useSelector((state: RootState) => state.form1.form1Data);

  return (
    <div className={style.wrapper}>
      {/* <div className={style.form1Data}>
        <h3>{form1Data && form1Data.length > 0 ? JSON.stringify(form1Data) : ''}</h3>
      </div> */}
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
