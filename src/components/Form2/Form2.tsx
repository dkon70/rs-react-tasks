import { Link } from 'react-router-dom';
import style from './Form2.module.scss';
import { useForm } from 'react-hook-form';
import { validationSchema, pictureToBase64 } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { setForm2Data } from '../../redux/store';

const Form2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resolver = yupResolver(validationSchema);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver, mode: 'onBlur' });

  const onSubmit = async (data) => {
    data.file = data.file ? await pictureToBase64(data.file[0]) : null;
    dispatch(setForm2Data(data));
    navigate('/');
  };

  return (
    <>
      <Link to="/" className={style.link}>
        &larr; to main page
      </Link>
      <div className={style.wrapper}>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.line}>
              <label>Name: </label>
              <input type="text" id="name" {...register('name')} />
            </div>
            <div className={style.error}>
              {(errors?.name && errors.name.message) as React.ReactNode}
            </div>

            <div className={style.line}>
              <label>Age: </label>
              <input type="text" id="age" {...register('age')} />
            </div>
            <div className={style.error}>
              {(errors?.age && errors.age.message) as React.ReactNode}
            </div>

            <div className={style.line}>
              <label>Country: </label>
              <select
                className={style.country}
                id="country"
                {...register('country')}
              >
                <option></option>
                <option>USA</option>
                <option>Canada</option>
              </select>
            </div>
            <div className={style.error}>
              {(errors?.country && errors.country.message) as React.ReactNode}
            </div>

            <div className={style.line}>
              <label>Email: </label>
              <input type="text" id="email" {...register('email')} />
            </div>
            <div className={style.error}>
              {(errors?.email && errors.email.message) as React.ReactNode}
            </div>

            <div className={style.line}>
              <label>Password: </label>
              <input type="password" id="password" {...register('password')} />
            </div>
            <div className={style.error}>
              {(errors?.password && errors.password.message) as React.ReactNode}
            </div>

            <div className={style.line}>
              <label>Password again: </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword')}
              />
            </div>
            <div className={style.error}>
              {
                (errors?.confirmPassword &&
                  errors.confirmPassword.message) as React.ReactNode
              }
            </div>

            <div className={style.line}>
              <label>Gender: </label>
              <input
                type="radio"
                id="genderm"
                value="M"
                {...register('gender')}
              />
              <label htmlFor="genderm">M</label>
              <input
                type="radio"
                id="genderf"
                value="F"
                {...register('gender')}
              />
              <label htmlFor="genderf">F</label>
            </div>
            <div className={style.error}>
              {(errors?.gender && errors.gender.message) as React.ReactNode}
            </div>

            <div className={style.line}>
              <input
                type="checkbox"
                id="acceptTerms"
                {...register('acceptTerms')}
              />
              <label htmlFor="acceptTerms">I accept terms and conditions</label>
            </div>
            <div className={style.error}>
              {
                (errors?.acceptTerms &&
                  errors.acceptTerms.message) as React.ReactNode
              }
            </div>

            <div className={style.line}>
              <input type="file" id="file" {...register('file')} />
            </div>
            <div className={style.error}>
              {(errors?.file && errors.file.message) as React.ReactNode}
            </div>

            <button className={style.button} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form2;
