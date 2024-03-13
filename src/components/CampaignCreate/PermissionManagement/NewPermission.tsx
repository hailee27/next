import React from 'react';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import CButtonShadow from '@/components/common/CButtonShadow';
import { usePostNewPermissionCompaniesMutation } from '@/redux/endpoints/users';
import toastMessage from '@/utils/func/toastMessage';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';

function NewPermission() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [trigger] = usePostNewPermissionCompaniesMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="px-[48px] pt-[32px]">
      <div className="border-b-2 border-[#333] flex justify-between items-center pb-[24px] mb-[47px]">
        <span className="text-[32px] font-bold">権限管理</span>
      </div>
      <div className="bg-white rounded-[8px] p-[40px]">
        <Form
          form={form}
          onFinish={(e) =>
            trigger({
              params: { companyId: String(user?.companyId) },
              body: { email: e.accountAddress, membership: e.authority },
            })
              .unwrap()
              .then(() => {
                router.push('/campaign-creator/permission-management');
                toastMessage('権限の変更に成功しました。', 'success');
              })
              .catch((err) => toastMessage(getErrorMessage(err), 'error'))
          }
        >
          <InputLabel label="アカウントアドレス" name="accountAddress" />
          <SelectLabel
            initialValue="MANAGER"
            label="権限"
            name="authority"
            options={[
              { value: 'MANAGER', label: '管理者' },
              { value: 'MEMBER', label: 'メンバー' },
            ]}
          />
        </Form>
        <div className="flex justify-center space-x-5 pt-[20px]">
          <div className="w-[184px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-white"
              classRounded="rounded-[6px]"
              classShadowColor="bg-main-text"
              onClick={() => router.back()}
              shadowSize="normal"
              textClass="bg-main-text"
              title="キャンセル"
            />
          </div>
          <div className="w-[100px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-main-text"
              classRounded="rounded-[6px]"
              classShadowColor="bg-white"
              onClick={() => form.submit()}
              shadowSize="normal"
              title="保存"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPermission;
