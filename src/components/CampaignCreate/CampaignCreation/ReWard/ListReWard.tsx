import BasicInput from '@/components/common/BasicInput';
import BasicSwitch from '@/components/common/BasicSwitch';
import { Form, Image } from 'antd';
import React from 'react';

function ListReWard({ index, onDelete }: { index: number; onDelete: () => void }) {
  const form = Form.useFormInstance();
  const paypayWatch = Form.useWatch(['reWard', `reWard${index}`, 'receivingMethod', 'paypay'], form) ?? false;
  const amazonWatch = Form.useWatch(['reWard', `reWard${index}`, 'receivingMethod', 'amazon'], form) ?? false;

  return (
    <div className="border-2 border-[#2D3648] rounded-[4px] p-[40px]">
      <div className="flex items-end justify-between text-[16px] font-semibold mb-[24px]">
        <span>{index}等</span>
        {index !== 1 && (
          <Image alt="" className="cursor-pointer" onClick={onDelete} preview={false} src="/icons/icon-x-circle.svg" />
        )}
      </div>
      <div className="flex space-x-[24px] w-full justify-between mb-[24px]">
        <div className="flex space-y-[8px] flex-col w-full">
          <span className="text-[14px] font-semibold">金額</span>
          <Form.Item initialValue="円" name={['reWard', `reWard${index}`, 'money']}>
            <BasicInput type="currency" />
          </Form.Item>
        </div>
        <div className="flex space-y-[8px] flex-col w-full">
          <span className="text-[14px] font-semibold">当選本数</span>
          <Form.Item name={['reWard', `reWard${index}`, 'tiketWinning']}>
            <BasicInput type="number" />
          </Form.Item>
        </div>
      </div>
      <div className="w-full">
        <div className="text-[14px] font-semibold mb-[5px]">受取方法</div>
        <div className="flex space-x-[16px]">
          <div className="flex items-center space-x-[12px]">
            <span className="text-[16px]">Amazon gift card</span>
            <Form.Item
              initialValue={amazonWatch}
              name={['reWard', `reWard${index}`, 'receivingMethod', 'amazon']}
              noStyle
            >
              <BasicSwitch />
            </Form.Item>
          </div>
          <div className="flex space-x-[12px]">
            <span className="text-[16px]">Paypay gift</span>
            <Form.Item
              initialValue={paypayWatch}
              name={['reWard', `reWard${index}`, 'receivingMethod', 'paypay']}
              noStyle
            >
              <BasicSwitch />
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListReWard;
