import React, { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicDatePicker from '@/components/common/BasicDatePicker';
import BasicSwitch from '@/components/common/BasicSwitch';
import UploadButton from '@/components/common/UploadButton';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import CButtonShadow from '@/components/common/CButtonShadow';
import type { CropperProps } from 'react-easy-crop';
import moment from 'moment';
import { range } from '@/utils/range';
import { useGetDetailCampaignQuery } from '@/redux/endpoints/campaign';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import ExplanatoryText from './ExplanatoryText';

function Setup() {
  const router = useRouter();
  const [form] = Form.useForm();
  const noDateWatch = Form.useWatch('noDate', form);
  const startDateWatch = Form.useWatch('startDate', form);
  const { data: dataCampaign } = useGetDetailCampaignQuery(
    { campaignId: String(router?.query?.id) },
    { skip: !router?.query?.id }
  );
  const { data } = useGetMasterDataQuery();
  const dataCategory = useMemo(
    () =>
      data?.CATEGORY_CAMPAIGN?.map((e) => ({
        value: e.value,
        label: e.label,
      })),
    [data?.CATEGORY_CAMPAIGN]
  );

  useEffect(() => {
    if (dataCampaign) {
      form.setFieldsValue({
        campainName: dataCampaign.title,
        category: dataCampaign.category,
        endDate:
          !dataCampaign.dontSetExpiredTime && dataCampaign.expiredTime
            ? dayjs(moment(dataCampaign.expiredTime).format(), 'YYYY-MM-DD HH:mm')
            : undefined,
        explanatoryText: dataCampaign.description,
        noDate: dataCampaign.dontSetExpiredTime,
        startDate: dataCampaign.startTime
          ? dayjs(moment(dataCampaign.startTime).format(), 'YYYY-MM-DD HH:mm')
          : undefined,
        thumbnail: dataCampaign.image,
      });
    }
  }, [dataCampaign]);

  return (
    <>
      <div className="mt-[16px]  bg-white rounded-[4px] p-[40px]">
        <Form form={form} name="setUp" scrollToFirstError={{ behavior: 'smooth', inline: 'center', block: 'center' }}>
          <InputLabel
            label="キャンペーン名"
            name="campainName"
            placeholder="記入してください"
            required
            rules={[{ required: true, message: '' }]}
          />
          <SelectLabel
            label="カテゴリー"
            name="category"
            options={dataCategory}
            placeholder="選択してください"
            required
            rules={[{ required: true, message: '' }]}
          />
          <div className="flex space-x-[8px] items-center mb-[10px]">
            <div className="text-[14px] font-bold ">サムネイル</div>
            <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
              必須
            </div>
          </div>
          <Form.Item name="thumbnail" rules={[{ required: true, message: '' }]}>
            <UploadButton
              className="w-[175px]"
              props={{ cropperProps: { cropSize: { height: 279, width: 279 } } as CropperProps }}
            />
          </Form.Item>
          {/* <div className="text-[14px] font-semibold mb-[5px] mt-[24px]">説明文</div> */}
          <div className="flex space-x-[8px] items-center mb-[10px]">
            <div className="text-[14px] font-bold ">説明文</div>
            <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
              必須
            </div>
          </div>
          <Form.Item name="explanatoryText" rules={[{ required: true, message: ' ' }]}>
            <ExplanatoryText />
          </Form.Item>
          <div className="my-[32px]">
            <div className="flex space-x-3 text-[14px] font-bold mb-[5px]">
              <span>開始日時を設定</span>
              <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
                必須
              </div>
            </div>

            <Form.Item className="!flex-1" name="startDate" rules={[{ required: true, message: '' }]}>
              <BasicDatePicker
                disabledDate={(current) => dayjs(current) < dayjs().add(-1, 'day')}
                disabledTime={(current) => {
                  if (dayjs(current).format('DD') === dayjs().format('DD')) {
                    return {
                      disabledHours: () => range(0, Number(dayjs().format('HH'))),
                      disabledMinutes: () => {
                        if (dayjs(current).format('HH') === dayjs().format('HH')) {
                          return range(0, Number(dayjs().format('mm')));
                        }
                        return range(0, 0);
                      },
                    };
                  }
                  return {
                    disabledHours: () => range(0, Number(dayjs(current).startOf('day').format('HH'))),
                    disabledMinutes: () => range(0, Number(dayjs(current).startOf('day').format('mm'))),
                  };
                }}
                format="YYYY-MM-DD HH:mm"
                placeholder="開始日時を選択してください"
                showTime
              />
            </Form.Item>
          </div>
          <div className="flex items-center space-x-[32px] ">
            <div className="flex flex-col space-y-[12px]">
              <span className="text-[14px] font-bold">終了日時を設定</span>
              <span className="text-[#777] font-normal">
                ※オフの場合、手動でキャンペーンを終了するまで公開中のステータスとなります
              </span>
            </div>
            <Form.Item name="noDate" noStyle>
              <BasicSwitch />
            </Form.Item>
          </div>
          <div className="mt-[16px]">
            <Form.Item className="!flex-1 !mb-0" name="endDate" rules={[{ required: !noDateWatch, message: '' }]}>
              <BasicDatePicker
                disabled={noDateWatch}
                disabledDate={(current) =>
                  moment(current.format('YYYY-MM-DD')) < moment(startDateWatch?.format('YYYY-MM-DD'))
                }
                format="YYYY-MM-DD HH:mm"
                placeholder="終了日時を選択してください"
                showNow
                showTime
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="flex space-x-[24px] pt-[48px] justify-center">
        <div className="w-[135px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[6px]"
            classShadowColor="bg-main-text"
            onClick={() => router.back()}
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
        <div className="w-[233px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-main-text"
            classRounded="rounded-[6px]"
            classShadowColor="bg-white"
            onClick={() => form.submit()}
            shadowSize="normal"
            title="保存して次へ進む"
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

export default Setup;
