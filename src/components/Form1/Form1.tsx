import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setForm1Data } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './Form1.module.scss';
import { validationSchema } from '../../utils/utils';
import { pictureToBase64 } from '../../utils/utils';
import { Form1Values, Form1Errors } from '../../utils/types';


const Form1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Form1Errors>({});

  const validateForm = async (): Promise<Form1Values | null> => {
    try {
      const formData: Form1Values = {
        name: nameRef.current?.value ?? '',
        age: ageRef.current?.value ?? '',
        country: countryRef.current?.value ?? '',
        email: emailRef.current?.value ?? '',
        password: passwordRef.current?.value ?? '',
        confirmPassword: confirmPasswordRef.current?.value ?? '',
        gender: genderRef.current?.value ?? '',
        acceptTerms: acceptTermsRef.current?.checked ?? false,
        file: fileRef.current?.files?.[0] ?? null,
      };

      await validationSchema.validate(formData, { abortEarly: false });
      return formData;
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const formattedErrors: Form1Errors = {};

        for (const error of validationErrors.inner) {
          if (error.path) formattedErrors[error.path] = error.message;
        }

        setErrors(formattedErrors);
      }
      return null;
    }
  };

  const validateField = async (fieldName: string, value: any) => {
    try {
      await validationSchema.validateAt(fieldName, { [fieldName]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: (error as yup.ValidationError).message,
      }));
    }
  };

  const handleBlur = (
    event:
        React.FocusEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = event.target;
    let fieldValue;

    if (type === 'checkbox') {
      fieldValue = (event.target as HTMLInputElement).checked;
    } else {
      fieldValue = value;
    }

    validateField(name, fieldValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validData = await validateForm();

    if (validData) {
      const base64Image = await pictureToBase64(validData.file);
      const formWithBase64Image = { ...validData, file: base64Image };

      dispatch(setForm1Data(formWithBase64Image));
      navigate('/');
    }
  };

  return (
    <>
      <Link to="/" className={style.link}>
        &larr; to main page
      </Link>
      <div className={style.wrapper}>
        <div className={style.form}>
          <form onSubmit={handleSubmit}>
            <div className={style.line}>
              <label>Name: </label>
              <input
                type="text"
                ref={nameRef}
                id="name"
                name="name"
                onBlur={handleBlur}
              />
            </div>
            <div className={style.error}>{errors.name}</div>
            <div className={style.line}>
              <label>Age: </label>
              <input
                type="text"
                ref={ageRef}
                id="age"
                name="age"
                onBlur={handleBlur}
              />
            </div>
            <div className={style.error}>{errors.age}</div>
            <div className={style.line}>
              <label>Country: </label>
              <select ref={countryRef} className={style.country} id="country">
                <option></option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            <div className={style.error}>{errors.country}</div>
            <div className={style.line}>
              <label>Email: </label>
              <input
                type="text"
                ref={emailRef}
                id="email"
                name="email"
                onBlur={handleBlur}
              />
            </div>
            <div className={style.error}>{errors.email}</div>
            <div className={style.line}>
              <label>Password: </label>
              <input
                type="password"
                ref={passwordRef}
                id="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleBlur}
              />
            </div>
            <div className={style.error}>{errors.password}</div>
            <div className={style.line}>
              <label>Password again: </label>
              <input
                type="password"
                ref={confirmPasswordRef}
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
            <div className={style.error}>{errors.confirmPassword}</div>
            <div className={style.line}>
              <label>Gender: </label>
              <input
                type="radio"
                ref={genderRef}
                id="genderm"
                name="gender"
                value="M"
                onBlur={handleBlur}
              />
              <label htmlFor="genderm">M</label>
              <input
                type="radio"
                ref={genderRef}
                id="genderf"
                name="gender"
                value="F"
                onBlur={handleBlur}
              />
              <label htmlFor="genderf">F</label>
            </div>
            <div className={style.error}>{errors.gender}</div>
            <div className={style.line}>
              <input
                type="checkbox"
                ref={acceptTermsRef}
                id="acceptTerms"
                name="acceptTerms"
                onBlur={handleBlur}
                onChange={handleBlur}
              />
              <label htmlFor="acceptTerms">I accept terms and conditions</label>
            </div>
            <div className={style.error}>{errors.acceptTerms}</div>
            <div className={style.line}>
              <input
                type="file"
                ref={fileRef}
                id="file"
                name="file"
                accept="image/*"
                onBlur={handleBlur}
              />
            </div>
            <div className={style.error}>{errors.file}</div>

            <button className={style.button} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form1;
