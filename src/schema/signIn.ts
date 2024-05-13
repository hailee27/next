import * as yup from 'yup';

const signInSchema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    isTeacher: yup.boolean(),
  })
  .required();
export default signInSchema;
