import toastMessage from './func/toastMessage';

export const copyFunc = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toastMessage('コピーしました！', 'success');
  } catch (err) {
    toastMessage('コピーに失敗しました!', 'error');
  }
};
