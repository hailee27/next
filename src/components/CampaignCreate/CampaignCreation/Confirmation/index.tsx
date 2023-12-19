import BasicButton from '@/components/common/BasicButton';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import BasicInput from '@/components/common/BasicInput';
import { Form } from 'antd';

import TableReWard from './TableReWard';

function Confirmation() {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const queryParams = useMemo(() => JSON.parse((query?.query as string) ?? ''), [query]);
  // console.log(queryParams.typeWinner);

  return (
    <div className="border-2 border-[#2D3648] rounded-[4px] mt-[36px] p-[40px]">
      <Form form={form}>
        <BasicButton className="w-[138px] h-[56px]" type="primary">
          プレビュー
        </BasicButton>
        <div className="mt-[24px] grid grid-cols-3 gap-y-[24px]">
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold leading-[16px]">キャンペーン名</span>
            <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">test_ikeyama</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold leading-[16px]">カテゴリー</span>
            <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">マーケティング</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold leading-[16px]">キャンペーン期間</span>
            <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">2023/12/1〜2023/12/25</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold leading-[16px]">当選者選定方法</span>
            <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">インスタントウィン</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold leading-[16px]">現在のステータス</span>
            <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">下書き</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold leading-[16px]">キャンペーン作成者</span>
            <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">池山智隆</span>
          </div>
        </div>
        <div className="w-full mt-[24px]">
          {queryParams.typeWinner === 'instantWin' ? (
            <>
              <div className="text-[14px] font-semibold mb-[8px]">報酬</div>
              <TableReWard />
              <div className="flex flex-col mt-[24px]">
                <span className="text-[16px] font-semibold leading-[24px]">
                  すべてのあたりが当選したあと、キャンペーンを終了する
                </span>
                <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">終了する</span>
              </div>
              <div className="flex flex-col mt-[24px]">
                <span className="text-[16px] font-semibold leading-[20px]">支払方法</span>
                <div className="flex flex-col p-[12px] space-y-[18px] text-[16px]  leading-[24px]">
                  <span className="font-semibold">Mastercard</span>
                  <span>末尾が•••• 7274のクレジットカード</span>
                </div>
              </div>
              <div className="mt-[24px]">
                <span className="text-[14px] font-semibold leading-[16px]">デポジット残高 ※ 12,000円利用可能</span>
                <div className="flex space-x-[8px] mt-[8px]">
                  <div className="w-[210px]">
                    <Form.Item initialValue="12000" name="depositBalance" noStyle>
                      <BasicInput type="number" />
                    </Form.Item>
                  </div>
                  <BasicButton type="primary">適用</BasicButton>
                </div>
              </div>
              <div className="mt-[24px]">
                <span className="text-[16px] font-semibold leading-[24px]">支払い金額合計: 104,050円</span>
                <div className="flex flex-col space-y-[32px] text-[16px] pt-[12px]">
                  <span>ギフト代金: 110,000円</span>
                  <span>手数料: 5,500円</span>
                  <span>消費税: 550円</span>
                  <span>デポジット残高利用: 12,000円</span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[217px]">
              <div className="text-[14px] font-semibold leading-[24px]">
                報酬要約文（TOPページ、及び、一覧ページに表示されます）※100文字以内
              </div>
              <div className="mt-[8px] px-[12px]">Value</div>
            </div>
          )}
        </div>
      </Form>
      <div className="flex space-x-[24px] border-t-2 border-[#2D3648] mt-[48px] pt-[48px]">
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

export default Confirmation;
