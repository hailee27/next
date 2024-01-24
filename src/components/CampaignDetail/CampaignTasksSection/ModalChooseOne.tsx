/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { Radio, Space } from 'antd';

export default function ModalChooseOne({
  isOpen,
  onCancel,
  taskInfo,
}: {
  isOpen: boolean;
  onCancel: () => void;
  taskInfo: any;
}) {
  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">タスクタイトル</h3>
      <div className="h-[16px]" />
      <p className="text-[13px] leading-[22px]">
        タスク説明文が入ります。タスク説明文が入ります。タスク説明文が入ります。
      </p>
      <div className="h-[32px]" />
      <h4 className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">質問文が入ります</h4>
      <div className="h-[16px]" />
      <div className="pl-[6px] pt-[6px]">
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#333] rounded-[8px]" />
          <div className="border-[2px] border-[#333] rounded-[8px] bg-white translate-x-[-6px] translate-y-[-6px] transition-all duration-200 overflow-hidden">
            <div className="p-[24px] clout-custom-antd-radio">
              <Radio.Group onChange={() => {}} value={1}>
                <Space className="flex flex-col gap-[16px]" direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option b</Radio>
                  <Radio value={3}>option c</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[24px]" />
      <div className="w-[206px] h-[53px] mx-auto">
        <CButtonShadow title="送信する" type="button" />
      </div>
    </CModalWapper>
  );
}
