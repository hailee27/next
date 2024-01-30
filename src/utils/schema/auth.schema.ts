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
    .min(8, '8文字以上入力してください。')
    .matches(REGEX_PASSWORD, '英字以外の文字が1文字以上必要です、スペースを含めないでください。'),
});

export const newPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, '8文字以上入力してください。')
    .matches(REGEX_PASSWORD, '英字以外の文字が1文字以上必要です、スペースを含めないでください。'),
  passwordConfirmation: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, '8文字以上入力してください。')
    .oneOf([yup.ref('newPassword')], 'パスワードは一致していません'),
});

export const phoneSchema = yup.object({
  phone: yup
    .string()
    .required('電話番号を入力してください')
    .matches(/^[0-9]+$/, '数字だけ入力してください')
    .min(10, '有効な電話番号を入力してください')
    .max(11, '11文字以内入力してください'),
});

export const authEmailPasswordSchema = emailSchema.concat(passwordSchema);
export const updatePasswordSchema = passwordSchema.concat(newPasswordSchema);

export type AuthEmailPasswordData = yup.InferType<typeof authEmailPasswordSchema>;

export type UpdateEmailData = yup.InferType<typeof emailSchema>;

export type NewPasswordData = yup.InferType<typeof newPasswordSchema>;
export type UpdatePasswordData = yup.InferType<typeof updatePasswordSchema>;

export type UpdatePhoneData = yup.InferType<typeof phoneSchema>;
