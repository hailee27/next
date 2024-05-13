import * as yup from 'yup';

export const createClassSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
