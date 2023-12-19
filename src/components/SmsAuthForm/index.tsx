/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import styles from './index.module.scss';

interface IComponentProps {
  onSubmitCode: (code: string) => void;
}
const { useForm } = Form;
export default function SmsAuthForm({ onSubmitCode }: IComponentProps) {
  const [form] = useForm();
  const input1 = Form.useWatch('sms-item-1', form);
  const input2 = Form.useWatch('sms-item-2', form);
  const input3 = Form.useWatch('sms-item-3', form);
  const input4 = Form.useWatch('sms-item-4', form);

  useEffect(() => {
    try {
      if (input1 && input2 && input3 && input4) {
        const inputValue = [input1, input2, input3, input4].join('');
        onSubmitCode?.(inputValue);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [input1, input2, input3, input4]);
  return (
    <div className="w-full bg-white  p-[0_24px] flex item-center justify-center flex-col gap-[26px]">
      <p className=" text-[12px] leading-[16px]">携帯電話に届いた認証コードを入力してください。</p>

      <Form className="w-full flex gap-[16px] items-center justify-center" form={form}>
        {[1, 2, 3, 4].map((i) => (
          <Form.Item key={i} name={`sms-item-${i}`} noStyle>
            <Input
              className={styles.input}
              maxLength={1}
              onKeyDown={(event) => {
                const { key } = event;
                const numberKey = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                if ([...numberKey, 'Backspace'].find((item) => item === key) === undefined) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
        ))}
      </Form>

      <p className="  text-[14px] leading-[16px] font-semibold">SMSが届いていませんか？</p>

      <a className={styles.moreAuthLink} href="#">
        自動音声案内で認証コードを受け取る
      </a>

      <a className={styles.moreAuthLink} href="#">
        認証コードを再送する
      </a>
    </div>
  );
}
