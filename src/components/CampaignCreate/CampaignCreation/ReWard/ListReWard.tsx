/* eslint-disable import/no-cycle */
import BasicInput from '@/components/common/BasicInput';
import BasicSwitch from '@/components/common/BasicSwitch';
import { Form, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import FlagItem from '@/components/common/FlagItem';
import { TypeReWard } from './InstantWin';

function ListReWard({ index, item, onDelete }: { index: number; item: TypeReWard; onDelete: () => void }) {
  const form = Form.useFormInstance();
  // const paypayWatch = Form.useWatch(['reWard', `reWard${item.key}`, 'receivingMethod', 'paypay'], form) ?? false;
  const amazonWatch = Form.useWatch(['reWard', `reWard${item.key}`, 'receivingMethod', 'amazon'], form);

  const [errorAmazon, setErrorrAmazon] = useState<boolean | null>(null);
  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        reWard: {
          [`reWard${item.key}`]: {
            reWardId: item.id,
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
      <Form.Item className="!hidden" name={['reWard', `reWard${item.key}`, 'reWardId']}>
        <FlagItem />
      </Form.Item>
      <div className="border-2 border-[#2D3648] rounded-[8px] p-[32px]">
        <div className="flex w-full border-b items-end justify-between text-[16px] font-semibold mb-[24px] pb-[24px]">
          <span>{index}等</span>
        </div>
        <div className="flex space-x-[24px] w-full justify-between mb-[24px]">
          <div className="flex space-y-[8px]  w-full items-center space-x-[16px]">
            <span className="text-[14px] font-semibold">金額</span>
            <div className="flex-1 relative ">
              <Form.Item className="!mb-0" name={['reWard', `reWard${item.key}`, 'money']}>
                <BasicInput placeholder="記入してください" type="currency" />
              </Form.Item>
              <span className="absolute top-[50%] -translate-y-[50%] right-[24px] font-medium text-[14px]">円</span>
            </div>
          </div>
          <div className="flex space-y-[8px]  w-full items-center space-x-[16px]">
            <span className="text-[14px] font-semibold">当選本数</span>
            <div className="flex-1 relative ">
              <Form.Item className="!mb-0" name={['reWard', `reWard${item.key}`, 'tiketWinning']}>
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
                className="!mb-0"
                initialValue={amazonWatch}
                name={['reWard', `reWard${item.key}`, 'receivingMethod', 'amazon']}
                // noStyle
                rules={[
                  {
                    validator: (_, checked) => {
                      if (!checked) {
                        setErrorrAmazon(true);
                        return Promise.reject();
                      }
                      setErrorrAmazon(false);
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <BasicSwitch />
              </Form.Item>
            </div>
          </div>
        </div>
        {errorAmazon && <span className="text-[#ff4d4f]">受取方法を選択する必要があります。</span>}
      </div>
    </div>
  );
}

export default ListReWard;
