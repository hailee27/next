export const ErrorCodeENG: { [key: string]: string } = {
  '400': '要求の形式が正しくありません',

  '400002': 'Invalid ordering format',
  '400003': 'Invalid query format',
  '400004': '$key should be a number',
  '400005': 'Invalid cursor format',
  '400006': 'The code is expired or incorrect',
  '400007': 'You have not completed the campaign yet',
  '400008': 'You have already received your reward',
  '400009': 'This campaign is not immediately rewarded',
  '400010': 'No prize found',
  '400011': 'campaign has expired',
  '401004': 'Cannot delete campaigns',
  '401005': 'No token provided',
  '401007': 'Incorrect password',
  '404001': 'User not found',
  '404002': 'Session not found',
  '404003': 'Company not found',
  '404004': 'Task not found',
  '404005': 'Amazon gift code not found',
  '404006': 'Campaign not found',
  '401001': 'Insufficient permission',
  '401002': 'Invalid credentials',
  '401003': 'Invalid token',

  '409001': 'This email already exists',
  '409002': 'User using this twitter account already exists',
  '409003': 'This code already exists',
  '409004': 'This user has joined a company',
  '409005': 'This phone number already exists',
  '429001': 'Rate limit exceeded',
};

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
