/* eslint-disable import/no-cycle */
import BasicInput from '@/components/common/BasicInput';
import BasicSwitch from '@/components/common/BasicSwitch';
import { Form, Image } from 'antd';
import React, { useEffect } from 'react';
import { TypeReWard } from './InstantWin';

function ListReWard({ index, item, onDelete }: { index: number; item: TypeReWard; onDelete: () => void }) {
  const form = Form.useFormInstance();
  // const paypayWatch = Form.useWatch(['reWard', `reWard${index}`, 'receivingMethod', 'paypay'], form) ?? false;
  const amazonWatch = Form.useWatch(['reWard', `reWard${index}`, 'receivingMethod', 'amazon'], form) ?? false;

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        reWard: {
          [`reWard${index}`]: {
            money: item.money,
            tiketWinning: item.tiketWinning,
            receivingMethod: {
              amazon: item.receivingMethod?.amazon,
            },
          },
        },
      });
    }
  }, [item]);
  return (
    <div>
      {index !== 1 && (
        <div className="text-right">
          <Image
            alt=""
            className="cursor-pointer"
            onClick={onDelete}
            preview={false}
            src="/icons/icon-x-circle_new.svg"
          />
        </div>
      )}
      <div className="border-2 border-[#2D3648] rounded-[8px] p-[32px]">
        <div className="flex w-full border-b items-end justify-between text-[16px] font-semibold mb-[24px] pb-[24px]">
          <span>{index}等</span>
        </div>
        <div className="flex space-x-[24px] w-full justify-between mb-[24px]">
          <div className="flex space-y-[8px]  w-full items-center space-x-[16px]">
            <span className="text-[14px] font-semibold">金額</span>
            <div className="flex-1 relative ">
              <Form.Item className="!mb-0" name={['reWard', `reWard${index}`, 'money']}>
                <BasicInput placeholder="記入してください" type="currency" />
              </Form.Item>
              <span className="absolute top-[50%] -translate-y-[50%] right-[24px] font-medium text-[14px]">円</span>
            </div>
          </div>
          <div className="flex space-y-[8px]  w-full items-center space-x-[16px]">
            <span className="text-[14px] font-semibold">当選本数</span>
            <div className="flex-1 relative ">
              <Form.Item className="!mb-0" name={['reWard', `reWard${index}`, 'tiketWinning']}>
                <BasicInput placeholder="記入してください" type="number" />
              </Form.Item>
              <span className="absolute top-[50%] -translate-y-[50%] right-[24px] font-medium text-[14px]">本</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center space-x-[32px]">
          <div className="text-[14px] font-semibold">受取方法</div>
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
            {/* <div className="flex space-x-[12px]">
              <span className="text-[16px]">Paypay gift</span>
              <Form.Item
                initialValue={paypayWatch}
                name={['reWard', `reWard${index}`, 'receivingMethod', 'paypay']}
                noStyle
              >
                <BasicSwitch />
              </Form.Item>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListReWard;
