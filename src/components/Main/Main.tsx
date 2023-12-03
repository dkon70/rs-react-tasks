import { Link } from 'react-router-dom';
import style from './Main.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Main = () => {
  const form1Data = useSelector((state: RootState) => state.form1.form1Data);

  return (
    <div className={style.wrapper}>
      <div className={style.form1Data}>
        {form1Data.map((el) => (
          <div key={el.password} className={style.card}>
            <p>Name: {el.name}</p>
            <p>Age: {el.age}</p>
            <p>Gender: {el.gender}</p>
            <p>Country: {el.country}</p>
            <p>T&C: {el.acceptTerms ? 'true' : 'false'}</p>
            <p>Email: {el.email}</p>
            <p>Password: {el.password}</p>
            <img width={50} height={50} src={el.file!}></img>
          </div>
        ))}
      </div>
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
