import * as yup from 'yup';

const signUpSchema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    name: yup.string().required(),
    gender: yup.string().required(),
    address: yup.string().required(),
  })
  .required();
export default signUpSchema;
