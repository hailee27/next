/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { RootState } from '@/redux/store';
import { convertCampaignTask } from '@/utils/func/convertCampaign';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { CampaignDetailContext } from '../CampainContext';
import TaskItem from './TaskItem';

export default function CampaignTasksSection() {
  const { masterData } = useSelector((store: RootState) => store.common);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isOpenModalSetupAuthEmail, setIsOpenModalSetupAuthEmail] = useState(false);
  const { campaignDetail, campaignTasks } = useContext(CampaignDetailContext);
  return (
    <>
      <div className="py-[56px] px-[20px]">
        <h3 className="text-[24px] font-bold tracking-[0.72px] text-center">タスク</h3>
        <div className="h-[24px]" />

        <div className="flex flex-col gap-[8px]">
          {campaignTasks &&
            Array.isArray(campaignTasks) &&
            campaignTasks?.length > 0 &&
            campaignTasks?.map((item) => {
              const result = convertCampaignTask(item, masterData);
              if (result) {
                return <TaskItem key={item?.id} task={result} />;
              }
              return '';
            })}
        </div>
        <div className="h-[40px]" />
        <div className=" flex items-center justify-center">
          <div className="w-[262px] h-[53px]">
            <CButtonShadow
              classBgColor="bg-[#c2c2c2]"
              classBorderColor="border-[#c2c2c2]"
              classShadowColor="bg-[#fff]"
              // isDisable
              onClick={() => {
                if (
                  campaignDetail?.methodOfselectWinners === 'MANUAL_SELECTION' &&
                  (!user?.emailId || !user?.havePassword)
                ) {
                  setIsOpenModalSetupAuthEmail(true);
                }
              }}
              textClass="text-white text-[14px] font-bold tracking-[0.42px]"
              title="キャンペーンに応募する"
              withIcon={{
                position: 'right',
                icon: <ArrowDown className="rotate-[-90deg]" />,
              }}
            />
          </div>
        </div>
        <div className="h-[40px] " />
        <p className="text-gray-2 text-[13px] leading-[22px] tracking-[0.39px]">
          利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
          <br />
          利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
        </p>
      </div>
      <CModalWapper
        isOpen={isOpenModalSetupAuthEmail}
        modalWidth={368}
        onCancel={() => {
          setIsOpenModalSetupAuthEmail(false);
        }}
      >
        <div>
          <h3 className="text-[24px] font-bold text-center">メール・パスワード登録</h3>
          <div className="h-[24px]" />
          <p>キャンペーンの応募にはメールアドレス・パスワードの登録が必要になります。</p>
          <div className="h-[24px]" />
          <div className="w-[206px] h-[53px] mx-auto">
            <CButtonShadow
              onClick={() => {
                router.push('/my-page');
              }}
              title="Go Setting"
              type="button"
            />
          </div>
        </div>
      </CModalWapper>
    </>
  );
}
