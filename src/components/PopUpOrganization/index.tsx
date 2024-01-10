import { usePopUpContext } from '@/context/PopUpContext';
import React from 'react';
// import { useRouter } from 'next/router';
import { Form } from 'antd';
import { usePostCompaniesMutation } from '@/redux/endpoints/companies';
import toastMessage from '@/utils/func/toastMessage';
import { useLazyMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import InputLabel from '../common/BasicInput/InputLabel';
import PopUpCreditOrDebitCard from '../OrganizeInformation/PopUpCreditOrDebitCard';
import UploadButton from '../common/UploadButton';
import CButtonClassic from '../common/CButtonClassic';
import CButtonShadow from '../common/CButtonShadow';
import SearchoOganizationID from './SearchoOganizationID';

function PopUpOrganization() {
  const { openPopUp, closePopUp } = usePopUpContext();
  // const router = useRouter();
  const [form] = Form.useForm();
  const [trigger] = usePostCompaniesMutation();
  const [getMe] = useLazyMeQuery();
  const dispatch = useDispatch();

  return (
    <div className="p-[64px] w-[928px] max-h-[829px] overflow-y-auto">
      <Form
        form={form}
        onFinish={(e) => {
          trigger(e)
            .unwrap()
            .then(() => {
              getMe()
                .unwrap()
                .then((res) => dispatch(setUser(res)));
              toastMessage('success', 'success');
              closePopUp();
            })
            .catch(() => toastMessage('error', 'error'));
        }}
      >
        <InputLabel
          label="組織名"
          name="name"
          placeholder="記入してください"
          required
          rules={[{ required: true, message: 'ご入力いただいた組織名は既に使用されています。' }]}
        />
        <InputLabel
          label="組織ID"
          name="code"
          placeholder="選択してください"
          required
          rules={[{ required: true, message: 'ご入力いただいた組織IDは既に使用されています。' }]}
        />
        <InputLabel
          label="組織 代表メールアドレス"
          name="email"
          placeholder="記入してください"
          required
          rules={[{ required: true, message: 'ご入力いただいた組織 代表メールアドレスは既に使用されています。' }]}
        />

        <div className="flex flex-col space-y-[10px] mb-[24px]">
          <div className="flex space-x-[8px] items-center ">
            <div className="text-[14px] font-bold ">ロゴ</div>
            <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
              必須
            </div>
          </div>
          {/* <span className="font-bold">ロゴ </span> */}
          <Form.Item name="companyImage" noStyle rules={[{ required: true, message: '' }]}>
            <UploadButton className="w-[149px]" />
          </Form.Item>
        </div>
        <div className="flex flex-col space-y-[10px]">
          <div className="flex space-x-[8px] items-center ">
            <div className="text-[14px] font-bold ">お支払い方法</div>
            <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
              必須
            </div>
          </div>
          {/* <span className="font-bold">お支払い方法</span> */}
          <CButtonClassic
            customClassName="!rounded-[6px] !w-[290px] !h-[47px] !text-[14px]"
            onClick={() => openPopUp({ contents: <PopUpCreditOrDebitCard /> })}
            title="クレジットまたはデビットカードを追加"
          />
        </div>
        <div className="flex space-y-[16px] items-center flex-col border-t border-[#AAA] mt-[32px] pt-[40px]">
          <div className="w-[195px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-main-text"
              classRounded="rounded-[6px]"
              classShadowColor="bg-white"
              onClick={() => {
                // router.push('/campaign/list');
                // closePopUp();
                form.submit();
              }}
              shadowSize="normal"
              title="組織を作成する"
            />
          </div>

          <span
            className="text-[12px] font-medium underline underline-offset-2 cursor-pointer w-max text-[#333]"
            onClick={() =>
              openPopUp({
                contents: <SearchoOganizationID />,
              })
            }
            onKeyPress={undefined}
            role="button"
            tabIndex={0}
          >
            既に存在する組織にサインインする
          </span>
        </div>
      </Form>
    </div>
  );
}

export default PopUpOrganization;
