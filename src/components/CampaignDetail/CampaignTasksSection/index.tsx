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
            classBgColor="bg-[#333]" // "bg-[#c2c2c2]"
            classBorderColor="border-[#333]" // "border-[#c2c2c2]"
            classShadowColor="bg-[#fff]"
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
      <div className="h-[40px]" />
      <p className="text-gray-2 text-[13px] leading-[22px] tracking-[0.39px]">
        利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
        <br />
        利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
      </p>
    </div>
  );
}

/**
  <div className="flex flex-col gap-[8px]">
        
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Xフォローさせる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <h3>@UserName</h3>
              <p>@UserNameのアカウントをフォローしてください。</p>
            </div>
          </div>
        </CShadowCard>
        
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Xリツイートさせる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>
                この投稿をリツイート: <a href="https://twitter.com/elonmusk/status/1748042397404037246">ツイート URL</a>
              </p>
            </div>
          </div>
        </CShadowCard>
       
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>X引用リツイートさせる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>
                この引用をリツイート: <a href="https://twitter.com/elonmusk/status/1748042397404037246">ツイート URL</a>
              </p>
              <p>
                リクエスト: <br />
                Using hashtag : #X
              </p>
            </div>
          </div>
        </CShadowCard>
        
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>X指定ハッシュタグ付きの投稿をさせる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>タスクタイトル: Create tweet with hashtag</p>
              <p>タスク説明: description ........</p>
              <p>デフォルト投稿テキスト: default tweet content</p>
            </div>
          </div>
        </CShadowCard>
        
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>X指定文言を投稿させる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>指定文言: Create tweet using content</p>
            </div>
          </div>
        </CShadowCard>
         
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Webサイトを訪問させる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>Web URL: ......</p>
            </div>
          </div>
        </CShadowCard>
         
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span> LINE友達登録させる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>リンク: ......</p>
            </div>
          </div>
        </CShadowCard>
         
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Tiktok視聴させる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>リンク: ......</p>
            </div>
          </div>
        </CShadowCard>
       
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Tiktokフォローさせる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>リンク: ......</p>
            </div>
          </div>
        </CShadowCard>
         
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Telegramチャンネルに参加させる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>リンク: ......</p>
            </div>
          </div>
        </CShadowCard>
        
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Telegram投稿を閲覧させる</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>リンク: ......</p>
            </div>
          </div>
        </CShadowCard>
       
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>DiscordサーバーにJoinする</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
            <div className="text-[14px]">
              <p>リンク: ......</p>
            </div>
          </div>
        </CShadowCard>
       
        <CShadowCard>
          <div className="p-[24px] flex gap-[8px] flex-col">
            <div className="  flex gap-[16px] items-center   ">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>アンケートに回答する</span>
                  <ArrowUpRightFormIcon />
                </div>
              </div>
            </div>
          </div>
        </CShadowCard>
         
      </div> 



 */
