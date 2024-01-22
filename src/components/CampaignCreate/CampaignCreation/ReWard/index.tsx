import React, { useContext, useEffect } from 'react';
import { Form } from 'antd';
// import BasicButton from '@/components/common/BasicButton';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicTextArea from '@/components/common/BasicTextArea';
import { StepContext, TypeTabContext } from '@/context/TabContext';
import CButtonShadow from '@/components/common/CButtonShadow';
import InstantWin from './InstantWin';

function ReWard() {
  const [form] = Form.useForm();
  const typeWinnerWatch = Form.useWatch('typeWinner', form);
  const { prevTab } = useContext<TypeTabContext>(StepContext);
  useEffect(() => {
    form.resetFields(['reWard']);
    form.resetFields(['compensationSummary']);
  }, [typeWinnerWatch]);

  return (
    <>
      <div className=" bg-white rounded-[16px] mt-[16px] p-[48px]">
        <Form form={form} name="reWard">
          <SelectLabel
            initialValue="AUTO_PRIZEE_DRAW"
            label="当選者選定方法"
            name="typeWinner"
            options={[
              { value: 'AUTO_PRIZEE_DRAW', label: 'インスタントウィン' },
              { value: 'MANUAL_SELECTION', label: '手動で参加者に報酬を案内する' },
            ]}
            placeholder="選択してください"
            required
            rules={[{ required: true, message: '' }]}
          />
          {typeWinnerWatch === 'AUTO_PRIZEE_DRAW' && <InstantWin />}
          <div className="flex flex-col space-y-[24px] ">
            {typeWinnerWatch === 'MANUAL_SELECTION' && (
              <div className="">
                <span className="font-semibold pb-[8px] block">報酬要約文 ※必須。全角100文字以内</span>
                <Form.Item name="compensationSummary" rules={[{ required: true, message: '' }]}>
                  <BasicTextArea maxLength={100} style={{ height: 145, resize: 'none' }} />
                </Form.Item>
              </div>
            )}
          </div>
        </Form>
      </div>
      <div className="flex space-x-[24px] justify-center pt-[48px]">
        <div className="w-[135px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[6px]"
            classShadowColor="bg-main-text"
            onClick={() => prevTab?.()}
            shadowSize="normal"
            textClass="bg-main-text"
            title="戻る"
            withIcon={{
              position: 'left',
              icon: (
                <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.0469 14.7422L9.35938 15.4297C9.04688 15.7109 8.57812 15.7109 8.29688 15.4297L2.23438 9.33594C1.92188 9.05469 1.92188 8.58594 2.23438 8.30469L8.29688 2.21094C8.57812 1.92969 9.07812 1.92969 9.35938 2.21094L10.0469 2.89844C10.3594 3.21094 10.3281 3.67969 10.0469 3.99219L6.26562 7.55469H15.2656C15.6719 7.55469 16.0156 7.89844 16.0156 8.30469V9.30469C16.0156 9.74219 15.6719 10.0547 15.2656 10.0547H6.26562L10.0469 13.6484C10.3281 13.9609 10.3594 14.4297 10.0469 14.7422Z"
                    fill="#333333"
                  />
                </svg>
              ),
            }}
          />
        </div>
        <div className="w-[316px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-main-text"
            classRounded="rounded-[6px]"
            classShadowColor="bg-white"
            onClick={() => form.submit()}
            shadowSize="normal"
            title="保存して購入申請待ちにする"
            withIcon={{
              position: 'right',
              icon: (
                <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.9375 2.89844L8.625 2.21094C8.9375 1.92969 9.40625 1.92969 9.6875 2.21094L15.7812 8.27344C16.0625 8.58594 16.0625 9.05469 15.7812 9.33594L9.6875 15.4297C9.40625 15.7109 8.9375 15.7109 8.625 15.4297L7.9375 14.7422C7.65625 14.4297 7.65625 13.9609 7.9375 13.6484L11.7188 10.0547H2.75C2.3125 10.0547 2 9.74219 2 9.30469V8.30469C2 7.89844 2.3125 7.55469 2.75 7.55469H11.7188L7.9375 3.99219C7.65625 3.67969 7.625 3.21094 7.9375 2.89844Z"
                    fill="white"
                  />
                </svg>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ReWard;
