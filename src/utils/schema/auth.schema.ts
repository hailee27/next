import * as yup from 'yup';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../constant/regex';

export const emailSchema = yup.object({
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください')
    .matches(REGEX_EMAIL, '有効なメールアドレスを入力してください'),
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, 'パスワードには少なくとも8文字が含まれている必要があります')
    .matches(
      REGEX_PASSWORD,
      'パスワードは 8 文字以上で、少なくとも 1 つの文字または数字を使用し、スペースを含めないでください。'
    ),
});

export const newPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, 'パスワードには少なくとも8文字が含まれている必要があります')
    .matches(
      REGEX_PASSWORD,
      'パスワードは 8 文字以上で、少なくとも 1 つの文字または数字を使用し、スペースを含めないでください。'
    ),
  passwordConfirmation: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, 'パスワードには少なくとも8文字が含まれている必要があります')
    .oneOf([yup.ref('newPassword')], 'パスワードは一致していません'),
});

export const authEmailPasswordSchema = emailSchema.concat(passwordSchema);
export const updatePasswordSchema = passwordSchema.concat(newPasswordSchema);

export type AuthEmailPasswordData = yup.InferType<typeof authEmailPasswordSchema>;
