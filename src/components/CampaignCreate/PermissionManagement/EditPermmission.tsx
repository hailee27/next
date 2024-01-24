import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import CButtonShadow from '@/components/common/CButtonShadow';
import { useLazyMeQuery } from '@/redux/endpoints/auth';
import { useGetUserDetailQuery, useUpdateUserMutation } from '@/redux/endpoints/users';
import { setUser } from '@/redux/slices/auth.slice';
import toastMessage from '@/utils/func/toastMessage';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function EditPermmission() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [triggerMe] = useLazyMeQuery();
  const { data } = useGetUserDetailQuery(
    { userId: String(router.query.id) },
    { refetchOnMountOrArgChange: true, skip: !router.isReady }
  );
  const [trigger] = useUpdateUserMutation();
  useEffect(() => {
    if (data && data.companyRole.membership) {
      form.setFieldsValue({ accountAddress: data.email.email, authority: data.companyRole.membership });
    }
  }, [data && data.companyRole.membership]);

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
              userId: String(router.query.id),
              body: { membership: e.authority, companyId: Number(data?.companyId), isAccept: true },
            })
              .unwrap()
              .then(() => {
                triggerMe()
                  .unwrap()
                  .then((res) => dispatch(setUser(res)));
                router.back();
                toastMessage('update succses', 'success');
              })
              .catch(() => toastMessage('error', 'error'))
          }
        >
          <InputLabel disabled label="アカウントアドレス" name="accountAddress" />
          <SelectLabel
            // initialValue={form.getFieldValue('authority')}
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

export default EditPermmission;
