import toastMessage from './func/toastMessage';

export const copyFunc = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toastMessage('Copied!', 'success');
  } catch (err) {
    toastMessage('Failed to copy!', 'error');
  }
};
