/* eslint-disable @typescript-eslint/no-explicit-any */
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styles from './index.module.scss';

const UploadButton = ({
  onChange,
  className,
  value,
  props,
}: {
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  props?: Omit<ImgCropProps, 'children'>;
}) => {
  const combinedClassName = [styles.customeButtonUpload, className].filter((e) => e).join(' ');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange: UploadProps['onChange'] = ({ fileList: newlist }) => {
    setFileList(newlist);
    onChange?.(newlist?.[0]?.originFileObj ?? null);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    if (value && fileList.length === 0) {
      setFileList([
        {
          uid: value.id,
          name: 'image.png',
          status: 'done',
          url: value.imageUrl,
          crossOrigin: 'anonymous',
        },
      ]);
    }
  }, [value, fileList]);

  return (
    <div className={`${combinedClassName}`}>
      <ImgCrop
        modalCancel="キャンセル"
        modalProps={{
          okButtonProps: { className: 'bg-[#333]' },
        }}
        modalTitle="画像修正"
        // onModalCancel={() => console.log('álo')}
        rotationSlider
        {...props}
      >
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          fileList={fileList}
          listType="picture-card"
          onChange={handleChange}
          onPreview={handlePreview}
          onRemove={() => onChange?.(null)}
        >
          {fileList.length > 0 ? '' : <span className="text-[16px] font-semibold text-white">画像を選択する</span>}
        </Upload>
      </ImgCrop>
      <Modal footer={null} onCancel={handleCancel} open={previewOpen}>
        <Image alt="example" crossOrigin="anonymous" preview={false} src={previewImage} width="100%" />
      </Modal>
    </div>
  );
};
UploadButton.defaultProps = {
  className: undefined,
  props: undefined,
  onChange: undefined,
  value: undefined,
};
export default UploadButton;
