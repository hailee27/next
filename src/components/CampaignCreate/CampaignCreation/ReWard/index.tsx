import BasicButton from '@/components/common/BasicButton';
import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import { Form } from 'antd';
import React, { useState } from 'react';
import BasicSwitch from '@/components/common/BasicSwitch';
import ListReWard from './ListReWard';

function ReWard() {
  const [form] = Form.useForm();
  const [reWard, setReWard] = useState<number[]>([1]);
  // const reWardWatch = Form.useWatch('reWard', form);
  // const totalReWard = useMemo(
  //   () =>
  //     Object.values(reWardWatch ?? {}).reduce((prev, cur) =>
  //       Number(Number(prev.money) * Number(prev.tiketWinning) + Number(Number(cur.money) * Number(cur.tiketWinning)))
  //     ),
  //   [reWardWatch]
  // );
  // console.log(Object.values(reWardWatch ?? {}));
  // console.log(totalReWard);
  return (
    <div className="border-2 border-[#2D3648] rounded-[4px] mt-[36px] p-[40px]">
      <Form form={form} name="reward">
        <SelectLabel
          initialValue="instantWin"
          label="当選者選定方法 ※必須"
          name="typeWinner"
          options={[
            { value: 'instantWin', label: 'インスタントウィン' },
            { value: 'manuallyInform', label: '手動で参加者に報酬を案内する' },
          ]}
          rules={[{ required: true, message: '' }]}
        />
        <InputLabel
          initialValue={1000}
          label="想定参加人数 ※必須"
          name="numberOfParticipants"
          rules={[{ required: true, message: '' }]}
          type="number"
        />
        <div className="flex flex-col space-y-[24px]">
          {reWard.map((e, i) => (
            <ListReWard index={i + 1} key={e} onDelete={() => setReWard((prev) => prev.filter((v) => v !== e))} />
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
                  <span className="text-[16px]">110,000円</span>
                </div>
              </div>
              <div className="flex-1">
                <span className="text-[14px] font-semibold">合計当選本数</span>
                <div className="px-[16px] py-[12px]">
                  <span className="text-[16px]">61</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-[12px] items-center mt-[24px]">
              <div className="flex flex-col space-y-[12px]">
                <span className="text-[16px] font-semibold">すべてのあたりが当選したあと、キャンペーンを終了する</span>
                <span className="text-[16px] ">※ オフの場合、キャンペーン期間が終了するまでハズレが出続けます。</span>
              </div>
              <BasicSwitch />
            </div>
          </div>
        </div>
        {/* <ListReWard /> */}
      </Form>
      <div className="flex space-x-[24px] border-t-2 border-[#2D3648] mt-[24px] pt-[48px]">
        <BasicButton className="w-[84px] h-[56px]" type="primary">
          戻る
        </BasicButton>
        <BasicButton className="w-[191px] h-[56px]" onClick={() => form.submit()}>
          保存して次へ進む
        </BasicButton>
      </div>
    </div>
  );
}

export default ReWard;
