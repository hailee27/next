import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from '@/components/common/BasicTable/index.module.scss';
import CButtonClassic from '@/components/common/CButtonClassic';

import { useRouter } from 'next/router';
import { useUpdateUserMutation } from '@/redux/endpoints/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import toastMessage from '@/utils/func/toastMessage';
import { useLazyMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';
import { useLazyGetCompanyUsersQuery } from '@/redux/endpoints/companies';

interface DataType {
  key: string;
  accountAddress: string;
  authority: string;
  status: string;
  id?: string;
}

function TablePermission() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [trigger] = useUpdateUserMutation();
  const [triggerMe] = useLazyMeQuery();
  const [triggerListCompanies, { data: dataCompanies, isLoading }] = useLazyGetCompanyUsersQuery();
  const [data, setData] = useState<DataType[] | undefined>(undefined);
  const columns: ColumnsType<DataType> = [
    {
      title: 'アカウントアドレス',
      dataIndex: 'accountAddress',
      key: 'accountAddress',
      render: (text) => <span className="text-[#04AFAF] underline underline-offset-2">{text}</span>,
    },
    {
      title: '権限',
      dataIndex: 'authority',
      key: 'authority',
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: ' ',
      key: 'id',
      dataIndex: 'id',
      render: (value, row) => (
        <div className="flex space-x-[16px]">
          <CButtonClassic
            customClassName="!bg-white !text-[#333] !w-[95px] !h-[37px]"
            onClick={() => {
              trigger({
                userId: String(value),
                body: { companyId: Number(user?.companyId), isAccept: false },
              })
                .unwrap()
                .then(() => {
                  triggerMe()
                    .unwrap()
                    .then((res) => dispatch(setUser(res)));
                  toastMessage('success delete', 'success');
                  setData((prev) => prev?.filter((e) => e.id !== value));
                })
                .catch(() => toastMessage('error', 'error'));
            }}
            title="削除"
            withIcon={{
              position: 'left',
              icon: (
                <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2011_22957)">
                    <path
                      d="M1.89062 13.4375V4.25H12.3906V13.4375C12.3906 14.1758 11.7891 14.75 11.0781 14.75H3.20312C2.46484 14.75 1.89062 14.1758 1.89062 13.4375ZM9.32812 6.4375V12.5625C9.32812 12.8086 9.51953 13 9.76562 13C9.98438 13 10.2031 12.8086 10.2031 12.5625V6.4375C10.2031 6.21875 9.98438 6 9.76562 6C9.51953 6 9.32812 6.21875 9.32812 6.4375ZM6.70312 6.4375V12.5625C6.70312 12.8086 6.89453 13 7.14062 13C7.35938 13 7.57812 12.8086 7.57812 12.5625V6.4375C7.57812 6.21875 7.35938 6 7.14062 6C6.89453 6 6.70312 6.21875 6.70312 6.4375ZM4.07812 6.4375V12.5625C4.07812 12.8086 4.26953 13 4.51562 13C4.73438 13 4.95312 12.8086 4.95312 12.5625V6.4375C4.95312 6.21875 4.73438 6 4.51562 6C4.26953 6 4.07812 6.21875 4.07812 6.4375ZM12.8281 1.625C13.0469 1.625 13.2656 1.84375 13.2656 2.0625V2.9375C13.2656 3.18359 13.0469 3.375 12.8281 3.375H1.45312C1.20703 3.375 1.01562 3.18359 1.01562 2.9375V2.0625C1.01562 1.84375 1.20703 1.625 1.45312 1.625H4.73438L4.98047 1.13281C5.08984 0.914062 5.30859 0.75 5.55469 0.75H8.69922C8.94531 0.75 9.16406 0.914062 9.27344 1.13281L9.54688 1.625H12.8281Z"
                      fill="#333333"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2011_22957">
                      <rect fill="white" height="14" transform="translate(0.015625 0.5)" width="14" />
                    </clipPath>
                  </defs>
                </svg>
              ),
            }}
          />
          {row.status === 'リクエスト中' ? (
            <CButtonClassic
              customClassName="!bg-white !text-[#333] !w-[95px] !h-[37px]"
              onClick={() => {
                trigger({
                  userId: String(value),
                  body: { companyId: Number(user?.companyId), membership: 'MEMBER', isAccept: true },
                })
                  .unwrap()
                  .then(() => {
                    triggerListCompanies({ companyId: String(user?.companyId), skip: 0, take: 10 })
                      .unwrap()
                      .then(() => toastMessage('success delete', 'success'));
                  })
                  .catch(() => toastMessage('error', 'error'));
              }}
              // onClick={() => router.push(`/campaign-creator/permission-management/edit/${value}`)}
              title="承認"
              withIcon={{
                position: 'left',
                icon: (
                  <svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9375 13.75H2.3125C1.57422 13.75 1 13.1758 1 12.4375V2.8125C1 2.10156 1.57422 1.5 2.3125 1.5H11.9375C12.6484 1.5 13.25 2.10156 13.25 2.8125V12.4375C13.25 13.1758 12.6484 13.75 11.9375 13.75ZM6.33203 11.0703L11.3633 6.03906C11.5273 5.875 11.5273 5.60156 11.3633 5.4375L10.7344 4.80859C10.5703 4.64453 10.2969 4.64453 10.1328 4.80859L6.03125 8.91016L4.08984 6.99609C3.92578 6.83203 3.65234 6.83203 3.48828 6.99609L2.85938 7.625C2.69531 7.78906 2.69531 8.0625 2.85938 8.22656L5.70312 11.0703C5.86719 11.2617 6.16797 11.2617 6.33203 11.0703Z"
                      fill="#333333"
                    />
                    <path
                      d="M11.9375 13.75H2.3125C1.57422 13.75 1 13.1758 1 12.4375V2.8125C1 2.10156 1.57422 1.5 2.3125 1.5H11.9375C12.6484 1.5 13.25 2.10156 13.25 2.8125V12.4375C13.25 13.1758 12.6484 13.75 11.9375 13.75ZM6.33203 11.0703L11.3633 6.03906C11.5273 5.875 11.5273 5.60156 11.3633 5.4375L10.7344 4.80859C10.5703 4.64453 10.2969 4.64453 10.1328 4.80859L6.03125 8.91016L4.08984 6.99609C3.92578 6.83203 3.65234 6.83203 3.48828 6.99609L2.85938 7.625C2.69531 7.78906 2.69531 8.0625 2.85938 8.22656L5.70312 11.0703C5.86719 11.2617 6.16797 11.2617 6.33203 11.0703Z"
                      fill="#333333"
                    />
                  </svg>
                ),
              }}
            />
          ) : (
            <CButtonClassic
              customClassName="!bg-white !text-[#333] !w-[95px] !h-[37px]"
              onClick={() => router.push(`/campaign-creator/permission-management/edit/${value}`)}
              title="編集"
              withIcon={{
                position: 'left',
                icon: (
                  <svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.93416 1.02441C10.6178 0.34082 11.7388 0.34082 12.4224 1.02441L13.4888 2.09082C14.1724 2.77441 14.1724 3.89551 13.4888 4.5791L12.1763 5.8916L8.62166 2.33691L9.93416 1.02441ZM11.5474 6.52051L5.17635 12.8916C4.90291 13.165 4.54744 13.3838 4.16463 13.4932L0.856037 14.4502C0.637287 14.5322 0.391193 14.4775 0.227131 14.2861C0.0357244 14.1221 -0.0189631 13.876 0.0357244 13.6572L1.0201 10.3486C1.12947 9.96582 1.34822 9.61035 1.62166 9.33691L7.99276 2.96582L11.5474 6.52051Z"
                      fill="#333333"
                    />
                  </svg>
                ),
              }}
            />
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    triggerListCompanies({ companyId: String(user?.companyId), skip: 0, take: 10 });
  }, [router.isReady]);
  useEffect(() => {
    if (dataCompanies?.users) {
      setData(
        dataCompanies?.users.map((e) => ({
          key: String(e.id),
          accountAddress: e.email.email,
          authority: e.companyRole.membership === 'MANAGER' ? '管理者' : 'メンバー',
          status: e.companyRole.isVerified ? '参加済' : 'リクエスト中',
          id: String(e.id),
        }))
      );
    }
  }, [dataCompanies]);

  return (
    <div className={styles.customTable}>
      <Table columns={columns} dataSource={data} loading={isLoading} pagination={false} tableLayout="fixed" />
    </div>
  );
}

export default TablePermission;
