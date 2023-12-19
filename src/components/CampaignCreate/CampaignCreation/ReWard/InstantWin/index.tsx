import InputLabel from '@/components/common/BasicInput/InputLabel';
import React, { useEffect, useMemo, useState } from 'react';
import BasicButton from '@/components/common/BasicButton';
import { Form } from 'antd';
import BasicSwitch from '@/components/common/BasicSwitch';
// import { formatNumber } from '@/utils/formatNumber';
import ListReWard from '../ListReWard';

interface TypeReWard {
  money: string;
  tiketWinning: string;
  receivingMethod: {
    amazon: boolean;
    paypay: boolean;
  };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FlagItem = ({ onChange, value }: { onChange?: (value: number | string) => void; value?: string | number }) => (
  <span>{value}</span>
);

FlagItem.defaultProps = {
  onChange: undefined,
  value: undefined,
};
function InstantWin() {
  const [reWard, setReWard] = useState<number[]>([1]);
  const form = Form.useFormInstance();
  const reWardWatch = Form.useWatch('reWard', form);
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
    form.setFieldValue('totalReWard', totalReWard);
    form.setFieldValue('totalTicket', totalTicket);
  }, [totalReWard, totalTicket]);
  return (
    <>
      <InputLabel
        initialValue={1000}
        label="想定参加人数 ※必須"
        name="numberOfParticipants"
        rules={[{ required: true, message: '' }]}
        type="number"
      />
      <div className="flex flex-col space-y-[24px]">
        {reWard.map((e, i) => (
          <ListReWard
            index={i + 1}
            key={e}
            onDelete={() => {
              setReWard((prev) => prev.filter((v) => v !== e));
              form.setFieldValue(['reWard', `reWard${i + 1}`], {});
            }}
          />
        ))}
        <div>
          <BasicButton
            className="w-[138px] h-[56px]"
            onClick={() => setReWard((prev) => [...prev, prev[prev.length - 1] + 1])}
          >
            賞品を追加
          </BasicButton>
          <div className="flex mt-[24px]">
            <div className="flex-1">
              <span className="text-[14px] font-semibold">合計金額</span>
              <div className="px-[16px] py-[12px]">
                <span className="text-[16px]">
                  <Form.Item name="totalReWard" noStyle>
                    <FlagItem />
                    {/* {!Number.isNaN(totalReWard) ? formatNumber(totalReWard, true, 1) : 0}円 */}
                  </Form.Item>
                  <span>円</span>
                </span>
              </div>
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-semibold">合計当選本数</span>
              <div className="px-[16px] py-[12px]">
                <span className="text-[16px]">
                  <Form.Item name="totalTicket" noStyle>
                    <FlagItem />
                    {/* {!Number.isNaN(totalReWard) ? formatNumber(totalReWard, true, 1) : 0}円 */}
                  </Form.Item>
                  {/* {totalTicket} */}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-[12px] items-center mt-[24px]">
            <div className="flex flex-col space-y-[12px]">
              <span className="text-[16px] font-semibold">すべてのあたりが当選したあと、キャンペーンを終了する</span>
              <span className="text-[16px] ">※ オフの場合、キャンペーン期間が終了するまでハズレが出続けます。</span>
            </div>
            <Form.Item initialValue={false} name="statusCampaign">
              <BasicSwitch />
            </Form.Item>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstantWin;
