export type TypePlatForm = 'web' | 'line' | 'tiktok' | 'telegram' | 'discord' | 'question' | 'twitter';
export function renderDataPlatform(platForm: TypePlatForm) {
  switch (platForm) {
    case 'web':
      return [
        {
          label: null,
          content: [{ id: 1, title: 'WebサイトURL', type: 'input', require: true, name: 'websiteURL' }],
        },
      ];
    case 'line':
      return [
        {
          label: null,
          content: [{ id: 1, title: 'リンク', type: 'input', require: true, name: 'linkLine' }],
        },
      ];
    case 'tiktok':
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
    case 'telegram':
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
    case 'discord':
      return [
        {
          value: 'joinServer',
          label: 'サーバーにJoinする',
          content: [{ id: 1, title: 'Invite link', type: 'input', require: true, name: 'inviteLink' }],
        },
      ];
    case 'question':
      return [
        { value: 'selectionFormat', label: '選択形式' },
        { value: 'freeAnswer', label: '自由回答' },
      ];
    default:
      return [
        {
          value: 'follow',
          label: 'フォローさせる',
          content: [{ id: 1, title: 'ユーザーネーム', type: 'input', name: 'userFollow' }],
        },
        {
          value: 'retweet',
          label: 'リツイートさせる',
          content: [{ id: 1, title: 'Post URL', type: 'input', name: 'postURL' }],
        },
        {
          value: 'retweetTheQuote',
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
          value: 'postsWithSpecifiedHashtags',
          label: '指定ハッシュタグ付きの投稿をさせる',
          content: [
            { id: 1, title: 'タスクタイトル ※必須', type: 'input', require: true, name: 'taskTitle' },
            { id: 2, title: 'タスク説明 ※必須', type: 'input', require: true, name: 'taskDescription' },
            { id: 3, title: 'デフォルト投稿テキスト', type: 'input', name: 'defaultPostText' },
          ],
        },
        {
          value: 'postSpecifiedText',
          label: '指定文言を投稿させる',
          content: [{ id: 1, title: '指定文言', type: 'input', name: 'designatedClassicalChinese' }],
        },
      ];
  }
}
