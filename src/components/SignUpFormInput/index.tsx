/* eslint-disable react/require-default-props */
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import clsx from 'clsx';
import styles from './styles.module.css';

function SignUpFormInput<FormData extends FieldValues>({
  name,
  register,
  type = 'text',
  errors = {},
  label,
}: {
  name?: Path<FormData>;
  placeholder?: string;
  register?: UseFormRegister<FormData>;
  type?: 'text' | 'password' | 'number';
  errors?: FieldErrors;
  label: string;
}) {
  const formRegister = register && name ? register(name) : {};

  return (
    <div className="w-full">
      <div className={styles.inputContainer}>
        <input
          className={clsx('inputContent', name && errors?.[name] ? 'content-error' : '')}
          {...formRegister}
          required
          type={type}
        />
        <span className={clsx('inputLabel', name && errors?.[name] ? 'label-error' : '')}>{label}</span>
      </div>
      <ErrorMessage
        errors={errors}
        name={name ?? ''}
        render={({ message }: { message?: string }) => (
          <p className=" mt-[4px] text-text-error text-[12px] font-normal">{message}</p>
        )}
      />
    </div>
  );
}

export default SignUpFormInput;
