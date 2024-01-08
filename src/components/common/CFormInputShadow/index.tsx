/* eslint-disable react/require-default-props */
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import clsx from 'clsx';
import styles from './styles.module.scss';

function CFormInputShadow<FormData extends FieldValues>({
  name,
  register,
  type = 'text',
  errors = {},
  label,
  placeholder,
}: {
  name?: Path<FormData>;
  placeholder?: string;
  register?: UseFormRegister<FormData>;
  type?: 'text' | 'password' | 'number';
  errors?: FieldErrors;
  label?: string;
}) {
  const formRegister = register && name ? register(name) : {};

  return (
    <div className="w-full">
      {label ? <span className={clsx('inputLabel', name && errors?.[name] ? 'label-error' : '')}>{label}</span> : ''}
      <div className="h-[53px] pl-[6px] pt-[6px]">
        <div className={styles.inputContainer}>
          <div className={clsx('shadowContent')} />
          <input
            className={clsx('inputContent', name && errors?.[name] ? 'content-error' : '')}
            {...formRegister}
            placeholder={placeholder}
            required
            type={type}
          />
        </div>
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

export default CFormInputShadow;
