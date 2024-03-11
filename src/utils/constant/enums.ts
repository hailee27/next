export const ErrorCode: { [key: string]: string } = {
  '400': '要求の形式が正しくありません',

  '400002': '無効な注文形式',
  '400003': '無効なクエリ形式',
  '400004': '$Keyは数字でなければならない',
  '400005': '無効なカーソル形式',
  '400006': 'コードの有効期限が切れているか、間違っています',
  '400007': 'まだキャンペーンを完了していません',
  '400008': 'あなたはすでに報酬を受け取っています',
  '400009': 'このキャンペーンはすぐに特典が付与されません',
  '400010': '賞品なし',
  '400011': 'キャンペーンは終了しました',
  '400012': 'あなたはすでに報酬を受け取っています',
  '400013': 'キャンペーンの支払いが完了しました',
  '400014': '管理者は1人以上必要となります',
  '400015': 'このキャンペーンはまだ支払われていません',
  '400017': 'This task has already been dones',

  '401004': 'キャンペーンを削除できません',
  '401005': 'トークンなし',
  '401007': 'ログインはできません！ メールアドレスまたはパスワードが間違っています。',
  '404001': '入力されたメールアドレスは存在しません。',
  '404002': 'セッションが見つかりません',
  '404003': '会社が見つかりません',
  '404004': 'タスクが見つかりません',
  '404005': 'Amazonギフトコードが見つかりません',
  '404006': 'キャンペーンが見つかりません',
  '401001': '権限不足',
  '401002': '無効な認証情報',
  '401003': '無効なトークン',

  '409001': 'このメールはすでに存在しています',
  '409002': 'このX(Twitter)アカウントはすでに存在しています',
  '409003': 'このコードはすでに存在しています',
  '409004': 'このユーザーは入社しました',
  '409005': 'この電話番号はすでに存在しています',

  '429001': 'レート制限超過',
};
export const PREVENT_CORS_URL = 'https://cors.bridged.cc';

export const USER_ROLE = {
  QUESTER: 'QUESTER',
  CREATOR: 'CREATOR',
};

export const PAGINATION_PAGE_SIZE = 20;
export const HOME_PAGINATION_PAGE_SIZE = 4;

export const TWITTER_FOLLOW_BASE_URL = 'https://twitter.com/intent/follow';
export const TWITTER_TWEET_POST_BASE_URL = 'https://twitter.com/intent/retweet';
export const TWITTER_COMPOSE_POST_BASE_URL = 'https://twitter.com/compose/post';

export const REDIRECT_QUERY_KEY = 'callback';
