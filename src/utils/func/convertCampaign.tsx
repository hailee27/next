/* eslint-disable max-lines */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeTask } from '@/redux/endpoints/campaign';
import { MasterDataResponse } from '@/redux/endpoints/masterData';
import toastMessage from './toastMessage';
import { getErrorMessage } from './getErrorMessage';

export interface TasksConvert {
  id: number;
  campaignId: string;
  title: string;
  description: React.ReactNode;
  type: 'OPEN_LINK' | 'FAQ_FREE_TEXT' | 'FAQ_CHOOSE_ONE' | 'FAQ_CHOOSE_MULTIPLE';
  link?: string;
  choose_options?: any;
  taskInfo?: any;
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
    toastMessage(getErrorMessage(err), 'error');
  }
  return result;
};

export const convertCampaignTask = (task: TypeTask | null) => {
  let result: TasksConvert | null = null;
  try {
    const taskPlatForm = task?.taskTemplate?.config?.platForm;
    switch (task?.type) {
      case 'TWITTER':
        switch (task?.taskTemplate?.config?.type) {
          case 'twitter_follow': {
            const targetUser = taskPlatForm === 'TWITTER' ? task?.taskTemplate?.config?.userFollow : '';
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
            const splitUrl = taskPlatForm === 'TWITTER' ? task?.taskTemplate?.config?.postURL?.split('/') : '';
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
            const splitUrl = taskPlatForm === 'TWITTER' ? task?.taskTemplate?.config?.postURLQuote?.split('/') : '';
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
                  {taskPlatForm === 'TWITTER' && task?.taskTemplate?.config?.quotePost ? (
                    <p>
                      リクエスト: <br />
                      {task?.taskTemplate?.config?.quotePost}
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
                  {taskPlatForm === 'TWITTER' && task?.taskTemplate?.config?.taskTitle ? (
                    <p>
                      タスクタイトル:
                      <br /> {task?.taskTemplate?.config?.taskTitle}
                    </p>
                  ) : (
                    ''
                  )}
                  {taskPlatForm === 'TWITTER' && task?.taskTemplate?.config?.taskDescription ? (
                    <p>
                      タスク説明:
                      <br /> {task?.taskTemplate?.config?.taskDescription}
                    </p>
                  ) : (
                    ''
                  )}
                  {taskPlatForm === 'TWITTER' && task?.taskTemplate?.config?.defaultPostText ? (
                    <p>
                      デフォルト投稿テキスト:
                      <br /> {task?.taskTemplate?.config?.defaultPostText}
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
                  {taskPlatForm === 'TWITTER' && task?.taskTemplate?.config?.designatedClassicalChinese ? (
                    <p>
                      指定文言:
                      <br /> {task?.taskTemplate?.config?.designatedClassicalChinese}
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
        const respUrl = taskPlatForm === 'VISIT_PAGE' ? task?.taskTemplate?.config?.url : '';
        const webUrl = respUrl?.indexOf('http') !== 0 ? `https://${respUrl}` : respUrl;
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
              {taskPlatForm === 'LINE' && task?.taskTemplate?.config?.url ? (
                <p>
                  リンク:
                  <br />
                  <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.url}</p>
                </p>
              ) : (
                ''
              )}
            </div>
          ),
          type: 'OPEN_LINK',
          link: taskPlatForm === 'LINE' ? task?.taskTemplate?.config?.url : '',
        };
        break;
      }
      case 'TIKTOK':
        switch (task?.taskTemplate?.config?.type) {
          case 'letThemWatch': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Tiktok視聴させる',
              description: (
                <div className="text-[14px]">
                  <p>
                    リンク:{' '}
                    <p className="line-clamp-1 text-ellipsis">
                      {taskPlatForm === 'TIKTOK' ? task?.taskTemplate?.config?.linkWatch : ''}
                    </p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: taskPlatForm === 'TIKTOK' ? task?.taskTemplate?.config?.linkWatch : '',
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
                    リンク:{' '}
                    <p className="line-clamp-1 text-ellipsis">
                      {taskPlatForm === 'TIKTOK' ? task?.taskTemplate?.config?.linkFollow : ''}
                    </p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: taskPlatForm === 'TIKTOK' ? task?.taskTemplate?.config?.linkFollow : '',
            };
            break;
          }
          default:
            return null;
        }
        break;
      case 'TELEGRAM':
        switch (task?.taskTemplate?.config?.type) {
          case 'joinChannel': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'Telegramチャンネルに参加させる',
              description: (
                <div className="text-[14px]">
                  <p>
                    リンク:{' '}
                    <p className="line-clamp-1 text-ellipsis">
                      {taskPlatForm === 'TELEGRAM' ? task?.taskTemplate?.config?.linkChannel : ''}
                    </p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: taskPlatForm === 'TELEGRAM' ? task?.taskTemplate?.config?.linkChannel : '',
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
                    リンク:{' '}
                    <p className="line-clamp-1 text-ellipsis">
                      {taskPlatForm === 'TELEGRAM' ? task?.taskTemplate?.config?.linkPost : ''}
                    </p>
                  </p>
                </div>
              ),
              type: 'OPEN_LINK',
              link: taskPlatForm === 'TELEGRAM' ? task?.taskTemplate?.config?.linkPost : '',
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
              {taskPlatForm === 'DISCORD' && task?.taskTemplate?.config?.inviteLink ? (
                <p>
                  リンク:
                  <br />
                  <p className="line-clamp-1 text-ellipsis">{task?.taskTemplate?.config?.inviteLink}</p>
                </p>
              ) : (
                ''
              )}
            </div>
          ),
          type: 'OPEN_LINK',
          link: taskPlatForm === 'DISCORD' ? task?.taskTemplate?.config?.inviteLink : '',
        };
        break;
      }
      case 'CUSTOM': {
        switch (task?.taskTemplate?.config?.type) {
          case 'freeAnswer': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'アンケートに回答する',
              description: '',
              type: 'FAQ_FREE_TEXT',
              taskInfo: task?.taskTemplate?.config ?? null,
            };
            break;
          }
          case 'formatMultiple': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'アンケートに回答する',
              description: '',
              type: 'FAQ_CHOOSE_MULTIPLE',
              taskInfo: task?.taskTemplate?.config ?? null,
            };
            break;
          }
          case 'formatSingle': {
            result = {
              id: task?.id ?? '',
              campaignId: task?.campaignId ?? '',
              title: 'アンケートに回答する',
              description: '',
              type: 'FAQ_CHOOSE_ONE',
              taskInfo: task?.taskTemplate?.config ?? null,
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
    toastMessage(getErrorMessage(err), 'error');
  }

  return result;
};
