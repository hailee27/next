/* eslint-disable max-lines */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeTask } from '@/redux/endpoints/campaign';
import { MasterDataResponse, TypeAction } from '@/redux/endpoints/masterData';
import toastMessage from './toastMessage';

export interface TasksConvert {
  id: number;
  campaignId: string;

  title: string;
  description: React.ReactNode;
  type: 'OPEN_LINK' | 'FAQ_FREE_TEXT' | 'FAQ_CHOOSE_ONE' | 'FAQ_CHOOSE_MULTIPLE';
  link?: string;
  choose_options?: any;
}

export const getMasterDataLabel = (
  masterData: MasterDataResponse | null | undefined,
  masterDataKey: string,
  itemValue: string
) => {
  const result = '';
  try {
    if (masterData && masterDataKey && Object.prototype?.hasOwnProperty.call(masterData, masterDataKey)) {
      const item = masterData?.[masterDataKey as keyof MasterDataResponse]?.find(
        // eslint-disable-next-line eqeqeq
        (i) => i?.value === itemValue
      );
      return item?.label ?? '';
    }
  } catch (err: any) {
    toastMessage(err?.message ?? JSON.stringify(err), 'error');
  }
  return result;
};

export const convertCampaignTask = (task: TypeTask | null, masterData: MasterDataResponse | null) => {
  let result: TasksConvert | null = null;
  try {
    switch (task?.type) {
      case 'TWITTER':
        switch (task?.taskTemplate?.config?.name?.type) {
          case 'twitter_follow': {
            const targetUser = task?.taskTemplate?.config?.name?.userFollow;
            const user =
              targetUser?.charAt(0) === '@' ? targetUser?.slice(1, (targetUser?.length ?? 0) - 1) : targetUser;
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Xフォローさせる',
              description: (
                <div className="text-[14px]">
                  <h3>{targetUser ?? ''}</h3>
                  <p>{targetUser ?? ''}のアカウントをフォローしてください。</p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: `https://twitter.com/intent/follow?screen_name=${user}`,
            };
            break;
          }
          case 'twitter_repost': {
            const splitUrl = task?.taskTemplate?.config?.name?.postURL?.split('/');
            const postId = splitUrl?.[(splitUrl?.length ?? 0) - 1] ?? '';
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Xリツイートさせる',
              description: (
                <div className="text-[14px]">
                  <p>
                    この投稿をリツイート: <p className="line-clamp-1 text-ellipsis">ツイート URL</p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: `https://twitter.com/intent/retweet?tweet_id=${postId}`,
            };
            break;
          }
          case 'twitter_repost_quote': {
            const splitUrl = task?.taskTemplate?.config?.name?.postURLQuote?.split('/');
            const postId = splitUrl?.[(splitUrl?.length ?? 0) - 1] ?? '';
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'X引用リツイートさせる',
              description: (
                <div className="text-[14px]">
                  <p>
                    この引用をリツイート: <p className="line-clamp-1 text-ellipsis">ツイート URL</p>
                  </p>
                  {task?.taskTemplate?.config?.name?.quotePost ? (
                    <p>
                      リクエスト: <br />
                      {task?.taskTemplate?.config?.name?.quotePost}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              ),
              type: 'OPEN_LINK',
              link: `https://twitter.com/intent/retweet?tweet_id=${postId}`,
            };
            break;
          }
          case 'twitter_make_post_with_hashtags': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'X指定ハッシュタグ付きの投稿をさせる',
              description: (
                <div className="text-[14px]">
                  {task?.taskTemplate?.config?.name?.taskTitle ? (
                    <p>
                      タスクタイトル:
                      <br /> {task?.taskTemplate?.config?.name?.taskTitle}
                    </p>
                  ) : (
                    ''
                  )}
                  {task?.taskTemplate?.config?.name?.taskDescription ? (
                    <p>
                      タスク説明:
                      <br /> {task?.taskTemplate?.config?.name?.taskDescription}
                    </p>
                  ) : (
                    ''
                  )}
                  {task?.taskTemplate?.config?.name?.defaultPostText ? (
                    <p>
                      デフォルト投稿テキスト:
                      <br /> {task?.taskTemplate?.config?.name?.defaultPostText}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              ),
              type: 'OPEN_LINK',
              link: 'https://twitter.com/compose/tweet',
            };
            break;
          }
          case 'twitter_make_post': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'X指定文言を投稿させる',
              description: (
                <div className="text-[14px]">
                  {task?.taskTemplate?.config?.name?.designatedClassicalChinese ? (
                    <p>
                      指定文言:
                      <br /> {task?.taskTemplate?.config?.name?.designatedClassicalChinese}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              ),
              type: 'OPEN_LINK',
              link: 'https://twitter.com/compose/tweet',
            };
            break;
          }
          default:
            return null;
        }
        break;
      case 'VISIT_PAGE': {
        const webUrl =
          task?.taskTemplate?.config?.name?.url?.indexOf('http') !== 0
            ? `https://${task?.taskTemplate?.config?.name?.url}`
            : task?.taskTemplate?.config?.name?.url;
        result = {
          id: task?.id ?? '',
          campaignId: task?.campaignId ?? '',
          title: 'Webサイトを訪問させる',
          description: (
            <div className="text-[14px]">
              Web URL: <br />
              <p className="line-clamp-1 text-ellipsis">{webUrl}</p>
            </div>
          ),
          type: 'OPEN_LINK',
          link: webUrl,
        };
        break;
      }
      case 'LINE': {
        result = {
          id: task?.id ?? '',
          campaignId: task?.campaignId ?? '',
          title: 'LINE友達登録させる',
          description: (
            <div className="text-[14px]">
              {task?.taskTemplate?.config?.name?.url ? (
                <p>
                  リンク:
                  <br />
                  <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.name?.url}</p>
                </p>
              ) : (
                ''
              )}
            </div>
          ),
          type: 'OPEN_LINK',
          link: task?.taskTemplate?.config?.name?.url,
        };
        break;
      }
      case 'TIKTOK':
        switch (task?.taskTemplate?.config?.name?.type) {
          case 'letThemWatch': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Tiktok視聴させる',
              description: (
                <div className="text-[14px]">
                  <p>
                    リンク: <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.name?.linkWatch}</p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: task?.taskTemplate?.config?.name?.linkWatch,
            };
            break;
          }
          case 'makeYouFollow': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Tiktokフォローさせる',
              description: (
                <div className="text-[14px]">
                  <p>
                    リンク: <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.name?.linkFollow}</p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: task?.taskTemplate?.config?.name?.linkFollow,
            };
            break;
          }
          default:
            return null;
        }
        break;
      case 'TELEGRAM':
        switch (task?.taskTemplate?.config?.name?.type) {
          case 'joinChannel': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Telegramチャンネルに参加させる',
              description: (
                <div className="text-[14px]">
                  <p>
                    リンク:{' '}
                    <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.name?.linkChannel}</p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: task?.taskTemplate?.config?.name?.linkChannel,
            };
            break;
          }
          case 'viewPost': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Telegram投稿を閲覧させる',
              description: (
                <div className="text-[14px]">
                  <p>
                    リンク: <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.name?.linkPost}</p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: task?.taskTemplate?.config?.name?.linkPost,
            };
            break;
          }
          default:
            return null;
        }
        break;
      case 'DISCORD': {
        result = {
          id: task?.id ?? '',
          campaignId: task?.campaignId ?? '',
          title: 'DiscordサーバーにJoinする',
          description: (
            <div className="text-[14px]">
              {task?.taskTemplate?.config?.name?.inviteLink ? (
                <p>
                  リンク:
                  <br />
                  <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.name?.inviteLink}</p>
                </p>
              ) : (
                ''
              )}
            </div>
          ),
          type: 'OPEN_LINK',
          link: task?.taskTemplate?.config?.name?.inviteLink,
        };
        break;
      }
      case 'CUSTOM': {
        switch (task?.taskTemplate?.config?.name?.type) {
          case 'freeAnswer': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'アンケートに回答する',
              description: '',
              type: 'FAQ_FREE_TEXT',
            };
            break;
          }

          default:
            return null;
        }
        break;
      }
      default:
        return null;
    }
  } catch (err: any) {
    toastMessage(err?.message ?? JSON.stringify(err), 'error');
  }

  return result;
};
