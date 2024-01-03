import InputLabel from '@/components/common/BasicInput/InputLabel';
import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';
import BasicSwitch from '@/components/common/BasicSwitch';
// import { formatNumber } from '@/utils/formatNumber';
import FlagItem from '@/components/common/FlagItem';
import CButtonClassic from '@/components/common/CButtonClassic';
import ListReWard from '../ListReWard';

export interface TypeReWard {
  money: string;
  tiketWinning: string;
  receivingMethod: {
    amazon: boolean;
    paypay: boolean;
  };
}

function InstantWin() {
  const [reWard, setReWard] = useState<number[]>([1]);
  const form = Form.useFormInstance();
  const reWardWatch = Form.useWatch(['reWard'], form);
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
            key={e}
            onDelete={() => {
              const newReWard = form.getFieldValue(['reWard']);
              delete newReWard[`reWard${i + 1}`];
              form.setFieldValue(['reWard'], newReWard);
              setReWard((prev) => prev.filter((v) => v !== e));
            }}
          />
        ))}
        <div className="flex flex-col items-end justify-end w-full">
          <CButtonClassic
            // className="w-[138px] h-[56px]"
            customClassName="!w-[149px] !h-[47px] !rounded-[6px]"
            onClick={() => setReWard((prev) => [...prev, prev[prev.length - 1] + 1])}
            title="賞品を追加する"
          />
          <div className="flex mt-[32px] space-x-[40px]">
            <div className="">
              <span className="text-[14px] font-bold">合計金額</span>
              <div className="py-[12px]">
                <span className="text-[14px] flex">
                  <Form.Item name="totalReWard" noStyle>
                    <FlagItem />
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
