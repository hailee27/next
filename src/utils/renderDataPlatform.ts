import { MasterDataResponse } from '@/redux/endpoints/masterData';

export type TypePlatForm = 'TWITTER' | 'TIKTOK' | 'LINE' | 'TELEGRAM' | 'DISCORD' | 'VISIT_PAGE' | 'CUSTOM';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderDataPlatform(platForm: TypePlatForm, data?: MasterDataResponse | undefined) {
  switch (platForm) {
    case 'VISIT_PAGE':
      return [
        {
          label: null,
          content: [{ id: 1, title: 'WebサイトURL', type: 'input', require: true, name: 'url' }],
        },
      ];
    case 'LINE':
      return [
        {
          label: null,
          content: [{ id: 1, title: 'リンク', type: 'input', require: true, name: 'url' }],
        },
      ];
    case 'TIKTOK':
      // return data?.TIKTOK_ACTION.map((e) => ({
      //   value: e.value,
      //   label: e.label,
      //   content: [{ id: e.id, title: 'リンク', type: 'input', require: true, name: 'url' }],
      // }));
      return [
        {
          value: 'letThemWatch',
          label: '視聴させる',
          content: [{ id: 1, title: 'リンク', type: 'input', require: true, name: 'linkWatch' }],
        },
        {
          value: 'makeYouFollow',
          label: 'フォローさせる',
          content: [{ id: 1, title: 'リンク', type: 'input', require: true, name: 'linkFollow' }],
        },
      ];
    case 'TELEGRAM':
      // return data?.TELEGRAM_ACTION.map((e) => ({
      //   value: e.value,
      //   label: e.label,
      //   content: [{ id: 1, title: 'リンク', type: 'input', require: true, name: 'link' }],
      // }));
      return [
        {
          value: 'joinChannel',
          label: 'チャンネルに参加させる',
          content: [{ id: 1, title: 'リンク', type: 'input', require: true, name: 'linkChannel' }],
        },
        {
          value: 'viewPost',
          label: '投稿を閲覧させる',
          content: [{ id: 1, title: 'リンク', type: 'input', require: true, name: 'linkPost' }],
        },
      ];
    case 'DISCORD':
      // return data?.DISCORD_ACTION.map((e) => ({
      //   value: e.value,
      //   label: e.label,
      //   content: [{ id: 1, title: 'Invite link', type: 'input', require: true, name: 'link' }],
      // }));
      return [
        {
          value: 'discord_invite',
          label: 'サーバーにJoinする',
          content: [{ id: 1, title: 'Invite link', type: 'input', require: true, name: 'inviteLink' }],
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
          content: [{ id: 1, title: 'ユーザーネーム', type: 'input', name: 'userFollow' }],
        },
        {
          value: 'twitter_repost',
          label: 'リツイートさせる',
          content: [{ id: 1, title: 'Post URL', type: 'input', name: 'postURL' }],
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
            },
            { id: 2, title: 'Post URL', type: 'input', name: 'postURLQuote' },
          ],
        },
        {
          value: 'twitter_make_post_with_hashtags',
          label: '指定ハッシュタグ付きの投稿をさせる',
          content: [
            { id: 1, title: 'タスクタイトル ※必須', type: 'input', require: true, name: 'taskTitle' },
            { id: 2, title: 'タスク説明 ※必須', type: 'input', require: true, name: 'taskDescription' },
            { id: 3, title: 'デフォルト投稿テキスト', type: 'input', name: 'defaultPostText' },
          ],
        },
        {
          value: 'twitter_make_post',
          label: '指定文言を投稿させる',
          content: [{ id: 1, title: '指定文言', type: 'input', name: 'designatedClassicalChinese' }],
        },
      ];
  }
}
