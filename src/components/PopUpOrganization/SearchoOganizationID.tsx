import { Form } from 'antd';
import React from 'react';
import { usePopUpContext } from '@/context/PopUpContext';
import { useRequestJoinCompaniesMutation } from '@/redux/endpoints/me';
import toastMessage from '@/utils/func/toastMessage';

import { useLazyMeQuery } from '@/redux/endpoints/auth';

import InputLabel from '../common/BasicInput/InputLabel';
import CButtonShadow from '../common/CButtonShadow';

function SearchoOganizationID() {
  const { closePopUp } = usePopUpContext();
  const [trigger] = useRequestJoinCompaniesMutation();
  const [getMe] = useLazyMeQuery();

  return (
    <div className="p-[64px] w-[928px]">
      <Form
        onFinish={(e) => {
          trigger({ companyCode: e.organizationID })
            .unwrap()
            .then(() => {
              getMe()
                .unwrap()
                .then(() => {
                  closePopUp();
                });
              toastMessage('send request success', 'success');
            })
            .catch(() => toastMessage('error', 'error'));
        }}
      >
        <InputLabel
          initialValue="123a534kj5wb3"
          label="組織ID"
          name="organizationID"
          required
          rules={[
            {
              required: true,
              message: 'ご入力いただいた組織 代表メールアドレスは既に使用されています。',
            },
          ]}
        />
        <div className="flex space-y-[24px] flex-col items-center border-t border-[#AAA]  mt-[32px] pt-[40px]">
          <div className="w-[310px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-main-text"
              classRounded="rounded-[6px]"
              classShadowColor="bg-white"
              shadowSize="normal"
              title=" アクセス権限をリクエストする"
              type="submit"
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SearchoOganizationID;
