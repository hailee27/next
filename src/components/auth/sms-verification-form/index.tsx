/* eslint-disable no-console */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import { Form } from 'antd';
import { useEffect } from 'react';
import styles from './styles.module.scss';

interface IComponentProps {
  onSubmitCode: (code: string) => void;
  isSubmitError?: boolean;
}
const { useForm } = Form;
function toASCII(chars: string) {
  let ascii = '';
  try {
    for (let i = 0, l = chars.length; i < l; i++) {
      let c = chars[i].charCodeAt(0);

      // make sure we only convert half-full width char
      if (c >= 0xff00 && c <= 0xffef) {
        c = 0xff & (c + 0x20);
      }

      ascii += String.fromCharCode(c);
    }
  } catch (e) {
    console.log('e', e);
  }
  return ascii;
}
export default function SmsVerificationForm({ onSubmitCode, isSubmitError }: IComponentProps) {
  const [form] = useForm();
  const input1 = Form.useWatch('sms-item-1', form);
  const input2 = Form.useWatch('sms-item-2', form);
  const input3 = Form.useWatch('sms-item-3', form);
  const input4 = Form.useWatch('sms-item-4', form);

  useEffect(() => {
    try {
      if (input1 && input2 && input3 && input4) {
        const inputValue = [input1, input2, input3, input4].join('');
        onSubmitCode?.(toASCII(inputValue) ?? '');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('E', e);
    }
  }, [input1, input2, input3, input4]);
  useEffect(() => {
    if (isSubmitError === true) {
      form.resetFields();
    }
  }, [isSubmitError]);

  return (
    <Form className={styles.SmsVerificationForm} form={form}>
      {[1, 2, 3, 4].map((i) => (
        <Form.Item key={i} name={`sms-item-${i}`} noStyle>
          <input
            className="SmsVerificationFormInput"
            id={`smsVerifyFormItem-${i}`}
            maxLength={1}
            onChange={(event) => {
              const { maxLength, id, value } = event.target;
              const inputIndex = id.split('-')?.[1];
              if (value?.length >= maxLength) {
                if (parseInt(inputIndex, 10) < 4) {
                  const nextInput = document.getElementById(`smsVerifyFormItem-${parseInt(inputIndex, 10) + 1}`);

                  if (nextInput !== null) {
                    nextInput.focus();
                  }
                }
              }
            }}
            onKeyDown={(event) => {
              const { key } = event;
              const numberKey = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
              if ([...numberKey, 'Backspace', 'Tab'].find((item) => item === key) === undefined) {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>
      ))}
    </Form>
  );
}
