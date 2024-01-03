import React from 'react';
import CButtonShadow from '@/components/common/CButtonShadow';
import { useRouter } from 'next/router';
import { useGetDetailCampaignQuery } from '@/redux/endpoints/campaign';
import Detail from './Detail';
import CampaignParticipantsInstant from './CampaignParticipantsInstant';

function DetailCampaign() {
  const { push, query, back } = useRouter();
  const { data } = useGetDetailCampaignQuery({ campaignId: String(query?.id) });

  return (
    <div className="px-[48px] pb-[77px]">
      <div className="flex py-[32px] w-full justify-between border-b-2 border-[#2D3648] max-h-[112px]">
        <span className="text-[32px] font-bold">{query?.isChecking === 'true' ? data?.title : 'キャンペーン詳細'}</span>
        <div className="flex space-x-[8px]">
          {query?.isChecking === 'true' ? (
            <>
              <div className="w-[283px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-white"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-main-text"
                  onClick={() => back()}
                  shadowSize="normal"
                  textClass='"bg-main-text"'
                  title="キャンペーン詳細に戻る"
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
              <div className="w-[166px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-main-text"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-white"
                  // onClick={() => router.push('/campaign/create')}
                  shadowSize="normal"
                  // textClass='"bg-main-text"'
                  title="プレビュー"
                  withIcon={{
                    position: 'left',
                    icon: (
                      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 11.9922C14 11.4609 14.4375 10.9922 15 10.9922C15.5312 10.9922 16 11.4609 16 11.9922V13.9922C16 15.6797 14.6562 16.9922 13 16.9922H5C3.3125 16.9922 2 15.6797 2 13.9922V11.9922C2 11.4609 2.4375 10.9922 3 10.9922C3.53125 10.9922 4 11.4609 4 11.9922V13.9922C4 14.5547 4.4375 14.9922 5 14.9922H13C13.5312 14.9922 14 14.5547 14 13.9922V11.9922ZM8.28125 1.30469C8.65625 0.898438 9.3125 0.898438 9.6875 1.30469L13.6875 5.30469C14.0938 5.67969 14.0938 6.33594 13.6875 6.71094C13.3125 7.11719 12.6562 7.11719 12.2812 6.71094L10 4.42969V10.9922C10 11.5547 9.53125 11.9922 9 11.9922C8.4375 11.9922 8 11.5547 8 10.9922V4.42969L5.6875 6.71094C5.3125 7.11719 4.65625 7.11719 4.28125 6.71094C3.875 6.33594 3.875 5.67969 4.28125 5.30469L8.28125 1.30469Z"
                          fill="white"
                        />
                      </svg>
                    ),
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-[135px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-white"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-main-text"
                  // onClick={() => router.push('/campaign/create')}
                  shadowSize="normal"
                  textClass='"bg-main-text"'
                  title="削除"
                  withIcon={{
                    position: 'left',
                    icon: (
                      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 15.5V5H15V15.5C15 16.3438 14.3125 17 13.5 17H4.5C3.65625 17 3 16.3438 3 15.5ZM11.5 7.5V14.5C11.5 14.7812 11.7188 15 12 15C12.25 15 12.5 14.7812 12.5 14.5V7.5C12.5 7.25 12.25 7 12 7C11.7188 7 11.5 7.25 11.5 7.5ZM8.5 7.5V14.5C8.5 14.7812 8.71875 15 9 15C9.25 15 9.5 14.7812 9.5 14.5V7.5C9.5 7.25 9.25 7 9 7C8.71875 7 8.5 7.25 8.5 7.5ZM5.5 7.5V14.5C5.5 14.7812 5.71875 15 6 15C6.25 15 6.5 14.7812 6.5 14.5V7.5C6.5 7.25 6.25 7 6 7C5.71875 7 5.5 7.25 5.5 7.5ZM15.5 2C15.75 2 16 2.25 16 2.5V3.5C16 3.78125 15.75 4 15.5 4H2.5C2.21875 4 2 3.78125 2 3.5V2.5C2 2.25 2.21875 2 2.5 2H6.25L6.53125 1.4375C6.65625 1.1875 6.90625 1 7.1875 1H10.7812C11.0625 1 11.3125 1.1875 11.4375 1.4375L11.75 2H15.5Z"
                          fill="#333333"
                        />
                      </svg>
                    ),
                  }}
                />
              </div>
              <div className="w-[184px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-white"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-main-text"
                  // onClick={() => router.push('/campaign/create')}
                  shadowSize="normal"
                  textClass='"bg-main-text"'
                  title="プレビュー"
                  withIcon={{
                    position: 'left',
                    icon: (
                      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15 4.8125V5H11V1H11.1875C11.375 1 11.5625 1.09375 11.7188 1.25L14.75 4.28125C14.9062 4.4375 15 4.625 15 4.8125ZM10.75 6H15V16.25C15 16.6875 14.6562 17 14.25 17H3.75C3.3125 17 3 16.6875 3 16.25V1.75C3 1.34375 3.3125 1 3.75 1H10V5.25C10 5.6875 10.3125 6 10.75 6ZM6.5 6.5C5.6875 6.5 5 7.1875 5 8C5 8.84375 5.6875 9.5 6.5 9.5C7.34375 9.5 8 8.84375 8 8C8 7.1875 7.34375 6.5 6.5 6.5ZM13 14V10.5L11.7812 9.28125C11.625 9.125 11.375 9.125 11.25 9.28125L8 12.5L6.78125 11.2812C6.625 11.125 6.40625 11.125 6.25 11.25L5.03125 12.5L5 14H13Z"
                          fill="#333333"
                        />
                      </svg>
                    ),
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {query?.isChecking === 'true' ? <CampaignParticipantsInstant /> : <Detail data={data} />}
      {query?.isChecking !== 'true' && (
        <div className="flex space-x-[16px] justify-center  mt-[64px]">
          <div className="w-[376px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-white"
              classRounded="rounded-[6px]"
              classShadowColor="bg-main-text"
              shadowSize="normal"
              textClass="text-main-text"
              title="キャンペーンのステータスを完了にする"
            />
          </div>
          <div className="w-[293px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-main-text"
              classRounded="rounded-[6px]"
              classShadowColor="bg-white"
              onClick={() => push({ query: { ...query, isChecking: true } })}
              shadowSize="normal"
              title="キャンペーン参加状況を確認"
              type="submit"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailCampaign;
