import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from './Form1.module.scss';
import YupPassword from 'yup-password';
YupPassword(Yup);
import { useDispatch } from 'react-redux';
import { setForm1Data } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  name: string;
  age: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  file: string | null;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/[a-z A-Z а-я А-Я]$/, 'Must contain only letters'),
  age: Yup.number()
    .required('Age is required')
    .typeError('Must be a number')
    .positive('Must be a positive number'),
  country: Yup.string().required('Country is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .password()
    .required('Password is required')
    .min(6, 'Minimum 6 chars')
    .minUppercase(1, 'Min 1 uppercase')
    .minLowercase(1, 'Min 1 lowercase')
    .minNumbers(1, 'Min 1 number')
    .minSymbols(1, 'Min 1 symbol'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    'Accept terms and conditions is required'
  ),
  file: Yup.mixed().required('File is required'),
});

const Form2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      age: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.file = values.file ? await pictureToBase64(values.file) : null;
      dispatch(setForm1Data(values));
      navigate('/');
    },
  });

  const pictureToBase64 = (file: File | string | null) => {
    if (!file) {
      return Promise.resolve(null);
    }

    if (typeof file === 'string') {
      return Promise.resolve(file);
    }

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Link to="/" className={style.link}>
        &larr; to main page
      </Link>
      <div className={style.wrapper}>
        <div className={style.form}>
          <form onSubmit={formik.handleSubmit}>
            <div className={style.line}>
              <label>Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            <div className={style.error}>
              {formik.touched.name && formik.errors.name}
            </div>

            <div className={style.line}>
              <label>Age: </label>
              <input
                type="text"
                id="age"
                name="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
              />
            </div>
            <div className={style.error}>
              {formik.touched.age && formik.errors.age}
            </div>

            <div className={style.line}>
              <label>Country: </label>
              <select
                className={style.country}
                id="country"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              >
                <option></option>
                <option>USA</option>
                <option>Canada</option>
              </select>
            </div>
            <div className={style.error}>
              {formik.touched.country && formik.errors.country}
            </div>

            <div className={style.line}>
              <label>Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className={style.error}>
              {formik.touched.email && formik.errors.email}
            </div>

            <div className={style.line}>
              <label>Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <div className={style.error}>
              {formik.touched.password && formik.errors.password}
            </div>

            <div className={style.line}>
              <label>Password again: </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
            <div className={style.error}>
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </div>

            <div className={style.line}>
              <label>Gender: </label>
              <input
                type="radio"
                id="genderm"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="M"
                checked={formik.values.gender === 'M'}
              />
              <label htmlFor="genderm">M</label>
              <input
                type="radio"
                id="genderf"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="F"
                checked={formik.values.gender === 'F'}
              />
              <label htmlFor="genderf">F</label>
            </div>
            <div className={style.error}>
              {formik.touched.gender && formik.errors.gender}
            </div>

            <div className={style.line}>
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.acceptTerms}
              />
              <label htmlFor="acceptTerms">I accept terms and conditions</label>
            </div>
            <div className={style.error}>
              {formik.touched.acceptTerms && formik.errors.acceptTerms}
            </div>

            <div className={style.line}>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={(event) =>
                  formik.setFieldValue(
                    'file',
                    event.target.files && event.target.files[0]
                  )
                }
                onBlur={formik.handleBlur}
              />
            </div>
            <div className={style.error}>
              {formik.touched.file && formik.errors.file}
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
