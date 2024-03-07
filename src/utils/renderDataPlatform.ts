/* eslint-disable max-lines-per-function */
import { TypeConfig } from '@/components/CampaignCreate/CampaignCreation/Task/type';

export type TypePlatForm =
  | 'TWITTER'
  | 'TIKTOK'
  | 'LINE'
  | 'TELEGRAM'
  | 'DISCORD'
  | 'VISIT_PAGE'
  | 'CUSTOM'
  | 'SHARE_URL';

export const renderValue = () => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderDataPlatform(platForm: TypePlatForm, data?: TypeConfig | undefined) {
  switch (platForm) {
    case 'VISIT_PAGE':
      return [
        {
          label: null,
          content: [
            {
              id: 1,
              title: 'WebサイトURL',
              type: 'input',
              require: true,
              name: 'url',
              isUrl: true,
              value: data?.platForm === 'VISIT_PAGE' ? data.url : undefined,
            },
          ],
        },
      ];
    case 'LINE':
      return [
        {
          label: null,
          content: [
            {
              id: 1,
              title: 'リンク',
              type: 'input',
              require: true,
              name: 'url',
              value: data?.platForm === 'LINE' ? data.url : undefined,
            },
          ],
        },
      ];
    case 'TIKTOK':
      return [
        {
          value: 'letThemWatch',
          label: '視聴させる',
          content: [
            {
              id: 1,
              title: 'Username',
              type: 'input',
              require: true,
              name: 'linkWatch',
              isUrl: true,
              value: data?.platForm === 'TIKTOK' && data?.type === 'letThemWatch' ? data?.linkWatch : undefined,
            },
          ],
        },
        {
          value: 'makeYouFollow',
          label: 'フォローさせる',
          content: [
            {
              id: 1,
              title: 'Username',
              type: 'input',
              require: true,
              name: 'linkFollow',
              isUrl: true,
              value: data?.platForm === 'TIKTOK' && data?.type === 'makeYouFollow' ? data?.linkFollow : undefined,
            },
          ],
        },
      ];
    case 'TELEGRAM':
      return [
        {
          value: 'joinChannel',
          label: 'チャンネルに参加させる',
          content: [
            {
              id: 1,
              title: '共有リンク',
              type: 'input',
              require: true,
              name: 'linkChannel',
              value: data?.platForm === 'TELEGRAM' && data?.type === 'joinChannel' ? data?.linkChannel : undefined,
            },
          ],
        },
        {
          value: 'viewPost',
          label: '投稿を閲覧させる',
          content: [
            {
              id: 1,
              title: 'リンク',
              type: 'input',
              require: true,
              isUrl: true,
              name: 'linkPost',
              value: data?.platForm === 'TELEGRAM' && data?.type === 'viewPost' ? data?.linkPost : undefined,
            },
          ],
        },
      ];
    case 'DISCORD':
      return [
        {
          value: 'discord_invite',
          label: 'サーバーにJoinさせる',
          content: [
            {
              id: 1,
              title: 'Invite link',
              type: 'input',
              require: true,
              name: 'inviteLink',
              value: data?.platForm === 'DISCORD' && data?.type === 'discord_invite' ? data?.inviteLink : undefined,
            },
          ],
        },
      ];
    case 'CUSTOM':
      return [
        { value: 'formatSingle', label: '選択形式_単一回答' },
        { value: 'formatMultiple', label: '選択形式_複数回答' },
        { value: 'freeAnswer', label: '自由回答' },
      ];
    case 'SHARE_URL':
      return [];
    default:
      return [
        {
          value: 'twitter_follow',
          label: 'フォローさせる',
          content: [
            {
              id: 1,
              title: 'Xの Username',
              type: 'input',
              require: true,
              name: 'userFollow',
              value: data?.platForm === 'TWITTER' && data?.type === 'twitter_follow' ? data?.userFollow : undefined,
            },
          ],
        },
        {
          value: 'twitter_repost',
          label: 'リツイートさせる',
          content: [
            {
              id: 1,
              title: 'Post URL',
              type: 'input',
              isUrl: true,
              require: true,
              name: 'postURL',
              value: data?.platForm === 'TWITTER' && data?.type === 'twitter_repost' ? data?.postURL : undefined,
            },
          ],
        },
        {
          value: 'twitter_repost_quote',
          label: '引用リツイートさせる',
          content: [
            {
              id: 1,
              title: 'Quote Post',
              type: 'textArea',
              name: 'quotePost',
              require: true,
              value:
                data?.platForm === 'TWITTER' && data?.type === 'twitter_repost_quote' ? data?.quotePost : undefined,
            },
            {
              id: 2,
              title: 'Post URL',
              type: 'input',
              name: 'postURLQuote',
              isUrl: true,
              require: true,
              value:
                data?.platForm === 'TWITTER' && data?.type === 'twitter_repost_quote' ? data?.postURLQuote : undefined,
            },
          ],
        },
        {
          value: 'twitter_make_post_with_hashtags',
          label: '指定ハッシュタグ付きの投稿をさせる',
          content: [
            {
              id: 1,
              title: 'タスクタイトル',
              type: 'input',
              require: true,
              name: 'taskTitle',
              value:
                data?.platForm === 'TWITTER' && data?.type === 'twitter_make_post_with_hashtags'
                  ? data?.taskTitle
                  : undefined,
            },
            {
              id: 2,
              title: 'タスク説明 ',
              type: 'input',
              require: true,
              name: 'taskDescription',
              value:
                data?.platForm === 'TWITTER' && data?.type === 'twitter_make_post_with_hashtags'
                  ? data?.taskDescription
                  : undefined,
            },
            {
              id: 3,
              title: 'デフォルト投稿テキスト',
              type: 'input',
              name: 'defaultPostText',
              value:
                data?.platForm === 'TWITTER' && data?.type === 'twitter_make_post_with_hashtags'
                  ? data?.defaultPostText
                  : undefined,
            },
          ],
        },
        {
          value: 'twitter_make_post',
          label: '指定文言を投稿させる',
          content: [
            {
              id: 1,
              title: '指定文言',
              type: 'input',
              require: true,
              name: 'designatedClassicalChinese',
              value:
                data?.platForm === 'TWITTER' && data?.type === 'twitter_make_post'
                  ? data?.designatedClassicalChinese
                  : undefined,
            },
          ],
        },
      ];
  }
}
