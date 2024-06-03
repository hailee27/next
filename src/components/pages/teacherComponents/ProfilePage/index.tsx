import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';

import { useLazyGetTeacherInfoQuery, usePostTeacherChangePasswordMutation } from '@/redux/endpoints/teacher/account';
import BasicButton from '@/components/common/forms/BasicButton';
import { CreateUpdateDeleteResponse } from '@/redux/endpoints/teacher/student';

import TeacherChangePasswordModal from './Modal/TeacherChangePasswordModal';

const TeacherProfileComponents = () => {
  const [getMe, { data, isFetching }] = useLazyGetTeacherInfoQuery();
  const [changePassword] = usePostTeacherChangePasswordMutation();

  const [openChangePwd, setOpenChangeOwd] = useState<boolean>(false);

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="bg-[#fff] p-6">
      <Spin spinning={isFetching}>
        <p className="uppercase font-bold mb-5">Teacher Information</p>
        <div className="grid grid-cols-1 gap-y-5">
          <p className="">
            <span className="inline-block w-[100px] font-semibold">Name: </span>
            {data?.result?.name}
          </p>
          <p className="">
            <span className="inline-block w-[100px] font-semibold">Email: </span>
            {data?.result?.email}
          </p>
        </div>

        <div className="flex items-center justify-end gap-x-4 mt-8">
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              setOpenChangeOwd(true);
            }}
            styleType="rounded"
          >
            Change Password
          </BasicButton>
        </div>

        {openChangePwd && (
          <TeacherChangePasswordModal
            onSubmit={(values) => {
              changePassword({
                oldPassword: values?.oldPassword,
                newPassword: values?.password,
              }).then((res) => {
                if ((res as unknown as CreateUpdateDeleteResponse)?.data?.status) {
                  message.success('Cập nhật thông tin mật khẩu thành công');
                  setOpenChangeOwd(false);
                } else {
                  const errMsg = (res as unknown as { error: CreateUpdateDeleteResponse })?.error?.data?.message;
                  message.error(
                    errMsg === 'Internal Server Error' ? 'Please check old password and new password' : errMsg
                  );
                }
              });
            }}
            openModal={openChangePwd}
            setOpenModal={setOpenChangeOwd}
          />
        )}
      </Spin>
    </div>
  );
};

export default TeacherProfileComponents;
