/* eslint-disable react/require-default-props */
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

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
    <div>
      <div className={styles.inputContainer}>
        <input
          // className="w-full h-full  rounded-[8px] border-[1px] border-solid border-[#E3E5E5] text-[16px] pb-[-8px] "
          className={styles.inputContent}
          {...formRegister}
          type={type}
        />
        <span className={styles.inputLabel}>{label}</span>
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
