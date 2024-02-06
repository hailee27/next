/* eslint-disable import/no-cycle */
import InputLabel from '@/components/common/BasicInput/InputLabel';
import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';
import BasicSwitch from '@/components/common/BasicSwitch';
import FlagItem from '@/components/common/FlagItem';
import CButtonClassic from '@/components/common/CButtonClassic';
import { useRouter } from 'next/router';
import { useGetReWardsQuery } from '@/redux/endpoints/reWard';
import { useCampaignApiContext } from '@/context/CampaignApiContext';
import toastMessage from '@/utils/func/toastMessage';
import ListReWard from '../ListReWard';

export interface TypeReWard {
  key?: number;
  id?: string | number;
  money?: string | number;
  tiketWinning?: string | number;
  receivingMethod?: {
    amazon: boolean;
    paypay: boolean;
  };
}

function InstantWin() {
  const router = useRouter();
  const { setReWardIdDelete } = useCampaignApiContext();
  const [reWard, setReWard] = useState<TypeReWard[]>([{ key: 1 }]);
  const form = Form.useFormInstance();
  const reWardWatch = Form.useWatch(['reWard'], form);
  const { data: dataReward } = useGetReWardsQuery(
    { campaignId: String(router?.query?.id) },
    { skip: !router?.query?.id, refetchOnMountOrArgChange: true }
  );

  const totalReWard = useMemo(() => {
    if (reWardWatch) {
      const listReWard: TypeReWard[] = Object.values(reWardWatch ?? {});
      return listReWard
        .map((e) => Number(e?.money ?? 0) * Number(e?.tiketWinning ?? 0))
        .reduce((prev, cur) => prev + cur);
    }
    return 0;
  }, [reWardWatch]);

  const totalTicket = useMemo(() => {
    if (reWardWatch) {
      const listReWard: TypeReWard[] = Object.values(reWardWatch ?? {});
      return listReWard.map((e) => Number(e?.tiketWinning ?? 0)).reduce((prev, cur) => prev + cur);
    }
    return 0;
  }, [reWardWatch]);

  useEffect(() => {
    if (dataReward) {
      setReWard(
        dataReward.rewards.map((e, i) => ({
          key: i + 1,
          id: String(e.id) ?? undefined,
          money: e.amountOfMoney,
          tiketWinning: e.numberOfWinningTicket,
          receivingMethod: { amazon: e.type === 'AMAZON_GIFT', paypay: e.type === 'PAYPAY_GIFT' },
        }))
      );
    }
  }, [dataReward]);

  useEffect(() => {
    form.setFieldValue('totalReWard', Number.isNaN(totalReWard) ? 0 : totalReWard);
    form.setFieldValue('totalTicket', totalTicket);
  }, [totalReWard, totalTicket]);

  return (
    <>
      <div className="flex items-center space-x-[8px]">
        <InputLabel
          label="想定参加人数"
          name="numberOfParticipants"
          placeholder="記入してください"
          required
          rules={[{ required: true, message: '' }]}
          type="number"
        />
        <span className="font-medium">人</span>
      </div>
      <div className="mb-[12px] font-bold">賞品</div>
      <div className="flex flex-col space-y-[24px]">
        {reWard.map((e, i) => (
          <ListReWard
            index={i + 1}
            item={e}
            key={e.key}
            onDelete={() => {
              const newReWard = form.getFieldValue(['reWard']);
              delete newReWard[`reWard${i + 1}`];
              form.setFieldValue(['reWard'], newReWard);
              setReWard((prev) => prev.filter((v) => v.key !== e.key));
              setReWardIdDelete((prev) => [...prev, Number(e.id)]);
            }}
          />
        ))}
        <div className="flex flex-col items-end justify-end w-full">
          <CButtonClassic
            customClassName="!w-[149px] !h-[47px] !rounded-[6px]"
            onClick={() => setReWard((prev) => [...prev, { key: Number(prev[prev.length - 1]?.key ?? 0) + 1 }])}
            title="賞品を追加する"
          />
          <div className="flex mt-[32px] space-x-[40px]">
            <div className="">
              <span className="text-[14px] font-bold">合計金額</span>
              <div className="py-[12px]">
                <span className="text-[14px] flex">
                  <Form.Item
                    name="totalReWard"
                    noStyle
                    rules={[
                      {
                        validator: (_, value) => {
                          if (Number(value) === 0) {
                            return Promise.reject(new Error('')).finally(() =>
                              toastMessage('キャンペーンには少なくとも 1 つの賞品が必要です。', 'error')
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <FlagItem type="number" />
                  </Form.Item>
                  <span>&nbsp;円</span>
                </span>
              </div>
            </div>
            <div className="">
              <span className="text-[14px] font-bold">合計当選本数</span>
              <div className="py-[12px]">
                <span className="text-[14px] flex">
                  <Form.Item name="totalTicket" noStyle>
                    <FlagItem />
                  </Form.Item>
                  <span>&nbsp;本</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-[32px] items-center mt-[24px]">
          <div className="flex flex-col">
            <span className="text-[14px] font-bold">すべてのあたりが当選したあと、キャンペーンを終了する</span>
            <span className="text-[12px] ">※ オフの場合、キャンペーン期間が終了するまでハズレが出続けます。</span>
          </div>
          <Form.Item initialValue={false} name="statusCampaign" noStyle>
            <BasicSwitch />
          </Form.Item>
        </div>
      </div>
    </>
  );
}

export default InstantWin;
