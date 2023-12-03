import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/^$|[a-zA-Zа-яА-Я ]+$/, 'Must contain only letters'),
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

export { validationSchema, pictureToBase64 };
