/* eslint-disable no-console */
import BasicInput from '@/components/common/BasicInput';
import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicTextArea from '@/components/common/BasicTextArea';
import CButtonShadow from '@/components/common/CButtonShadow';
import { usePostContactMutation } from '@/redux/endpoints/contacts';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { Form } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function Inquiry() {
  const router = useRouter();

  const [postContact] = usePostContactMutation();
  const onSubmit = async (values) => {
    try {
      console.log(values);
      await postContact({
        ...values,
      }).unwrap();
      router.push('/inquiry/feedback');
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };
  return (
    <div className="pt-[40px] pb-[56px]">
      <div className="flex items-center flex-col space-y-[16px] px-[20px]">
        <h2 className="text-[28px] font-bold text-[#04AFAF]">お問い合わせ</h2>
        <p className="text-[13px] text-center leading-[22px] tracking-[0.39px] text-[#777]">
          いつもcloutをご利用いただきありがとうございます
          <br /> 下記連絡先、またはフォームよりお問い合わせください
        </p>
      </div>
      <div className="px-[20px] py-[56px] bg-[#D5FFFF] rounded-[32px] w-full mt-[24px]">
        <div className="max-w-[768px] mx-auto">
          <Form onFinish={onSubmit} scrollToFirstError={{ behavior: 'smooth', block: 'center' }}>
            <div className="flex space-x-[8px] items-center mb-[10px]">
              <div className="text-[14px] font-bold ">お名前</div>
              <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
                必須
              </div>
            </div>
            <div className="flex space-x-[8px] ">
              <div className="flex-1">
                <Form.Item name="firstName" rules={[{ required: true, message: '' }]}>
                  <BasicInput placeholder="田中" />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item name="lastName" rules={[{ required: true, message: '' }]}>
                  <BasicInput placeholder="太郎" />
                </Form.Item>
              </div>
            </div>
            <InputLabel
              label="メールアドレス"
              name="email"
              placeholder="tanaka@clout.com"
              required
              rules={[
                { required: true, message: '' },
                {
                  type: 'email',
                  message: '',
                },
              ]}
            />
            <InputLabel
              label="電話番号"
              name="phone"
              placeholder="0312345678"
              rules={[
                {
                  pattern: /^[0-9]{10,11}$/,
                  message: '',
                },
              ]}
            />
            <InputLabel label="組織名" name="organizationName" placeholder="Clout" />
            <SelectLabel
              label="お問い合わせの目的"
              name="purposeOfInquiry"
              options={[
                { label: '不具合について', value: '不具合について' },
                { label: 'キャンペーンについて', value: 'キャンペーンについて' },
                { label: 'アカウントについて', value: 'アカウントについて' },
                { label: 'その他', value: 'その他' },
              ]}
              placeholder="選択してください"
              required
              rules={[{ required: true, message: '' }]}
            />
            <div className="flex space-x-[8px] items-center mb-[10px]">
              <div className="text-[14px] font-bold ">お問い合わせ内容</div>
              <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
                必須
              </div>
            </div>
            <Form.Item name="contentOfInquiry" rules={[{ required: true, message: '' }]}>
              <BasicTextArea placeholder="ここに記入してください" style={{ height: 116, resize: 'none' }} />
            </Form.Item>
            <div className="flex items-center justify-center mt-[40px]">
              <div className="w-[155px] h-[56px]">
                <CButtonShadow title="送信する " type="submit" />
              </div>
            </div>
          </Form>
          <p className="mt-[16px] text-[13px] text-[#777]">
            ※続行することにより
            <Link className="font-bold" href="/terms-of-service">
              利用規約
            </Link>
            および
            <Link className="font-bold" href="/privacy-policy">
              プライバシーポリシー
            </Link>
            に同意したものとみなされます。
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
