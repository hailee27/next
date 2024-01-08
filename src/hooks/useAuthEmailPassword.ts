import { useAuthVerificationMutation } from '@/redux/endpoints/auth';
import { AuthEmailPasswordData, authEmailPasswordSchema } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useAuthEmailPassword() {
  const [hasCaptchaToken, setHasCaptchaToken] = useState(false);
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const [recaptchaVerify] = useAuthVerificationMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthEmailPasswordData>({
    resolver: yupResolver(authEmailPasswordSchema),
  });
  const password = watch('password');
  const email = watch('email');

  async function onChangeRecaptcha(token: string | null) {
    if (token) {
      setHasCaptchaToken(true);
      await recaptchaVerify({
        token,
        type: 'RECAPTCHA',
      });
    } else {
      setHasCaptchaToken(false);
    }
  }

  useEffect(() => {
    if (password && email && hasCaptchaToken) {
      setIsDisableSubmit(false);
    } else {
      setIsDisableSubmit(true);
    }
  }, [password, email, hasCaptchaToken]);
  return {
    register,
    handleSubmit,
    errors,
    isDisableSubmit,
    onChangeRecaptcha,
  };
}
