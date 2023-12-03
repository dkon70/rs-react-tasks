import { Link } from 'react-router-dom';
import style from './Form2.module.scss';

const Form1 = () => {
  return (
    <>
      <Link to="/" className={style.link}>
        &larr; to main page
      </Link>
      <div className={style.wrapper}>
        <div className={style.form}>
          <form className={style.line}>
            <label>Name: </label>
            <input />
          </form>
          <form className={style.line}>
            <label>Age: </label>
            <input />
          </form>
          <form className={style.line}>
            <label>Country: </label>
            <input />
          </form>
          <form className={style.line}>
            <label>Email: </label>
            <input />
          </form>
          <form className={style.line}>
            <label>Password: </label>
            <input type="password" />
          </form>
          <form className={style.line}>
            <label>Password again: </label>
            <input type="password" />
          </form>
          <form>
            <label>Gender: </label>
            <input type="radio" id="genderm" name="gender" />
            <label htmlFor="genderm">M</label>
            <input type="radio" id="genderf" name="gender" />
            <label htmlFor="genderf">F</label>
          </form>
          <form>
            <input type="checkbox" id="tc" />
            <label htmlFor="tc">I accept terms and conditions</label>
          </form>
          <form className={style.line}>
            <input type="file" />
          </form>
          <button className={style.button}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Form1;
