import * as yup from 'yup';
import { FORM_FIELD_ERROR_FEEDBACK } from '../constant/feedback-message';
import { REGEX_EMAIL } from '../constant/regex';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(FORM_FIELD_ERROR_FEEDBACK.emailRequired)
    .email(FORM_FIELD_ERROR_FEEDBACK.emailInvalid)
    .matches(REGEX_EMAIL, FORM_FIELD_ERROR_FEEDBACK.emailInvalid),
  password: yup
    .string()
    .required(FORM_FIELD_ERROR_FEEDBACK.passwordRequied)
    .min(8, FORM_FIELD_ERROR_FEEDBACK.passwordShortLength),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
