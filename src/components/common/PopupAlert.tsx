import { usePopUpContext } from '@/context/PopUpContext';
import React from 'react';

interface Props {
  onOk?: () => void;
  onCancel?: () => void;
  message: string;
}

function PopupAlert(props: Props) {
  const { onOk, onCancel, message } = props;
  const { closePopUp } = usePopUpContext();
  return (
    <div className="w-[300px] min-h-[150px] flex flex-col items-center">
      <div className="flex-1 w-full flex items-center justify-center  text-[16px] font-medium p-[20px] text-center">
        {message}
      </div>
      <div className="h-[50px] w-full flex items-center justify-between font-semibold border-t">
        <button
          className="w-full hover:text-zinc-500"
          onClick={() => {
            onCancel?.();
            closePopUp();
          }}
          type="button"
        >
          キャンセル
        </button>
        <button
          className="w-full hover:text-red-300 text-red-400"
          onClick={() => {
            onOk?.();
            closePopUp();
          }}
          type="button"
        >
          削除
        </button>
      </div>
    </div>
  );
}
PopupAlert.defaultProps = {
  onOk: undefined,
  onCancel: undefined,
};
export default PopupAlert;
