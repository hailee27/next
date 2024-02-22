import * as yup from 'yup';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../constant/regex';

export const emailSchema = yup.object({
  email: yup
    .string()
    .required('入力してください')
    .email('有効なメールアドレスを入力してください')
    .matches(REGEX_EMAIL, '有効なメールアドレスを入力してください'),
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .required('入力してください')
    .min(8, '8文字以上入力してください。')
    .matches(REGEX_PASSWORD, '英字以外の文字が1文字以上必要です、スペースを含めないでください。'),
});

export const newPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('入力してください')
    .min(8, '8文字以上入力してください。')
    .matches(REGEX_PASSWORD, '英字以外の文字が1文字以上必要です、スペースを含めないでください。')
    .test(
      'conflicting password',
      'パスワードが重複しています、再度確認お願いします。',
      function checkSamePassword(value) {
        const { password: currentPassword } = this.parent;
        return currentPassword ? !(value === currentPassword) : true;
      }
    ),
  passwordConfirmation: yup
    .string()
    .required('入力してください')
    .min(8, '8文字以上入力してください。')
    .oneOf([yup.ref('newPassword')], 'パスワードは一致していません'),
});

export const phoneSchema = yup.object({
  phone: yup
    .string()
    .required('入力してください')
    .matches(
      /^(?:\d{10}|\d{11}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/,
      '有効な携帯電話番号を入力してください'
    ),
});

export const authEmailPasswordSchema = emailSchema.concat(passwordSchema);
export const updatePasswordSchema = passwordSchema.concat(newPasswordSchema);

export type AuthEmailPasswordData = yup.InferType<typeof authEmailPasswordSchema>;

export type UpdateEmailData = yup.InferType<typeof emailSchema>;

export type NewPasswordData = yup.InferType<typeof newPasswordSchema>;
export type UpdatePasswordData = yup.InferType<typeof updatePasswordSchema>;

export type UpdatePhoneData = yup.InferType<typeof phoneSchema>;
