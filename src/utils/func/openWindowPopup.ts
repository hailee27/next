import { getErrorMessage } from './getErrorMessage';
import toastMessage from './toastMessage';

/* eslint-disable no-nested-ternary */
export const openWindowPopup = (url: string, title: string, w: number, h: number) => {
  try {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : w;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : h;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${w / systemZoom}, height=${
        h / systemZoom
      }, top=${top}, left=${left}`
    );

    newWindow?.focus();
  } catch (e) {
    toastMessage(getErrorMessage(e), 'error');
  }
};
