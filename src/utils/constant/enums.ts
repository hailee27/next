export const ErrorCode: { [key: string]: string } = {
  '400': '要求の形式が正しくありません',
  '400001': 'No token provided',
  '400002': 'Invalid ordering format',
  '400003': 'Invalid query format',
  '400004': '$key should be a number',
  '400005': 'Invalid cursor format',
  '400006': 'The code is expired or incorrect',

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
  '429001': 'Rate limit exceeded',
};

export const PREVENT_CORS_URL = 'https://cors.bridged.cc';

export const USER_ROLE = {
  QUESTER: 'QUESTER',
  CREATOR: 'CREATOR',
};

export const PAGINATION_PAGE_SIZE = 10;
export const HOME_PAGINATION_PAGE_SIZE = 4;
