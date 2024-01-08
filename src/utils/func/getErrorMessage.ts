/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCode } from '@/utils/constant/enums';

export function getErrorMessage(error: any) {
  let statusCode = '';

  if (typeof error?.data?.message === 'string') {
    statusCode = error?.data?.message?.split(' ')[0]?.replace(':', '');
  }
  if (Array.isArray(error?.data?.message)) {
    statusCode = (error?.data?.message[0] as string)?.split(' ')[0]?.replace(':', '');
  }

  // eslint-disable-next-line no-console
  console.log(error);

  return ErrorCode?.[statusCode] || error?.data?.message || error?.message || '内部サーバーエラー';
}
