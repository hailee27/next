/* eslint-disable react/no-unstable-nested-components */

import ArrowDown from '@/components/common/icons/ArrowDown';
import { useGetCouponsQuery } from '@/redux/endpoints/coupons';
import { Collapse } from 'antd';
import clsx from 'clsx';

import styles from './styles.module.scss';

export default function RewardHistoryCard() {
  const { data } = useGetCouponsQuery({});

  return (
    <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] bg-white">
      <p className="text-[16px] font-bold text-center">過去の報酬リスト</p>
      <div className="h-[24px]" />
      <div className={clsx('flex flex-col gap-[16px]', styles.customRewardCollapse)}>
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <span className="!text-[#04AFAF]">
              <ArrowDown className={clsx(isActive ? 'rotate-[-180deg] ' : '')} />
            </span>
          )}
          expandIconPosition="end"
          items={[
            {
              key: '1',
              label: 'amazon gift card',
              children: (
                <div>
                  {data && Array?.isArray(data?.coupons) && data?.coupons?.length
                    ? data?.coupons
                        ?.filter((item) => item?.type === 'AMAZON_GIFT')
                        ?.map((item) => (
                          <p className="reward-item  " key={item?.id}>
                            {item?.code}
                          </p>
                        ))
                    : ''}
                </div>
              ),
            },
          ]}
        />
        {/* <div className="h-[1px] bg-[#aaa]" />
        <div className={clsx('flex flex-col gap-[16px]', styles.customRewardCollapse)}>
          <Collapse
            accordion
            bordered={false}
            expandIcon={({ isActive }) => (
              <span className="!text-[#04AFAF]">
                <ArrowDown className={clsx(isActive ? 'rotate-[-180deg] ' : '')} />
              </span>
            )}
            expandIconPosition="end"
            items={[
              {
                key: '2',
                label: 'PayPay',
                children: (
                  <div>
                    <p className="reward-item line-clamp-1 text-ellipsis">https://......................</p>
                    <p className="reward-item line-clamp-1 text-ellipsis">https://......................</p>
                    <p className="reward-item line-clamp-1 text-ellipsis">https://......................</p>
                  </div>
                ),
              },
            ]}
          />
        </div> */}
      </div>
    </div>
  );
}
