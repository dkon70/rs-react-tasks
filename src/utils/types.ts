export type Form1Values = {
  name: string;
  age: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  file: File | null;
}

export type Form1Errors = {
  [key: string]: string | undefined;
}

export type Form2SliceData = {
  name: string;
  age: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  file: File[] | string | null;
};

export type Form2SliceState = {
  form2Data: Form2SliceData[];
};

export type Form1SliceData = {
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

export type Form1SliceState = {
  form1Data: Form1SliceData[];
}