import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';

export default function ModalFreeTextContent({ isOpen, onCancel }: { isOpen: boolean; onCancel: () => void }) {
  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">タスクタイトル</h3>
      <div className="h-[16px]" />
      <p className="text-[13px] leading-[22px]">
        タスク説明文が入ります。タスク説明文が入ります。タスク説明文が入ります。
      </p>
      <div className="h-[32px]" />
      <h4 className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">質問文が入ります</h4>
      <div className="h-[16px]" />
      <textarea
        className="w-full min-h-[120px] p-[16px] bg-[#F2F2F2] text-[13px] tracking-[0.39px] placeholder:text-[13px] placeholder:text-[#aaa] rounded-[8px] resize-none"
        placeholder="自由回答形式の回答欄"
      />
      <div className="h-[24px]" />

      <div className="w-[206px] h-[53px] mx-auto">
        <CButtonShadow title="送信する" type="button" />
      </div>
    </CModalWapper>
  );
}
