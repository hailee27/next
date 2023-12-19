import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import React, { useState } from 'react';
import { Image, Modal, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styles from './index.module.scss';

const UploadButton = ({
  onChange,
  className,
  props,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  className?: string;
  props?: Omit<ImgCropProps, 'children'>;
}) => {
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
    onChange?.(newlist);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleCancel = () => setPreviewOpen(false);

  const combinedClassName = [styles.customeButtonUpload, className].filter((e) => e).join(' ');

  return (
    <div className={`${combinedClassName}`}>
      <ImgCrop {...props}>
        <Upload fileList={fileList} listType="picture-card" onChange={handleChange} onPreview={handlePreview}>
          {fileList.length > 0 ? '' : <span className="text-[16px] font-semibold text-white">画像を選択する</span>}
        </Upload>
      </ImgCrop>
      <Modal footer={null} onCancel={handleCancel} open={previewOpen}>
        <Image alt="example" preview={false} src={previewImage} width="100%" />
      </Modal>
    </div>
  );
};
UploadButton.defaultProps = {
  className: undefined,
  props: undefined,
  onChange: undefined,
};
export default UploadButton;
