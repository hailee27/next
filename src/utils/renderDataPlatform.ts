/* eslint-disable max-lines-per-function */
import { TypeConfig } from '@/components/CampaignCreate/CampaignCreation/Task/type';

export type TypePlatForm = 'TWITTER' | 'TIKTOK' | 'LINE' | 'TELEGRAM' | 'DISCORD' | 'VISIT_PAGE' | 'CUSTOM';

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
              title: 'リンク',
              type: 'input',
              require: true,
              name: 'linkWatch',
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
              title: 'リンク',
              type: 'input',
              require: true,
              name: 'linkFollow',
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
              title: 'リンク',
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
          label: 'サーバーにJoinする',
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
    default:
      return [
        {
          value: 'twitter_follow',
          label: 'フォローさせる',
          content: [
            {
              id: 1,
              title: 'ユーザーネーム',
              type: 'input',
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
              title: 'Quote Post You can include hashtag and link. If not filled in, there will be no template',
              type: 'textArea',
              name: 'quotePost',
              value:
                data?.platForm === 'TWITTER' && data?.type === 'twitter_repost_quote' ? data?.quotePost : undefined,
            },
            {
              id: 2,
              title: 'Post URL',
              type: 'input',
              name: 'postURLQuote',
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
              title: 'タスクタイトル ※必須',
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
              title: 'タスク説明 ※必須',
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
