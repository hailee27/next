/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import CButtonShadow from '@/components/common/CButtonShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { TypeCampaign } from '@/redux/endpoints/campaign';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { convertCampaignTask } from '@/utils/func/convertCampaign';
import TaskItem from './TaskItem';

export default function CampaignTasksSection({ campaign }: { campaign: TypeCampaign | null }) {
  const { masterData } = useSelector((store: RootState) => store.common);
  return (
    <div className="py-[56px] px-[20px]">
      <h3 className="text-[24px] font-bold tracking-[0.72px] text-center">タスク</h3>
      <div className="h-[24px]" />
      {/* 
twitter
フォローさせる        // theo doi
リツイートさせる      //  retweet
引用リツイートさせる  //  Retweet the quote
指定ハッシュタグ付きの投稿をさせる  // create post using hashtag 
指定文言を投稿させる    // create post using  content


Webサイトを訪問させる // visit web

LINE友達登録させる // add friend
*/}

      <div className="flex flex-col gap-[8px]">
        {campaign?.Task &&
          Array.isArray(campaign?.Task) &&
          campaign?.Task?.length > 0 &&
          campaign?.Task?.map((item) => {
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
            isDisable
            onClick={() => {
              if (campaign?.methodOfselectWinners === 'MANUAL_SELECTION') {
                console.log('asdasdasdasd');
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
  );
}
