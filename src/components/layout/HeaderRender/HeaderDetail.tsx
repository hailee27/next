import { FC } from 'react';
import { Header } from 'antd/es/layout/layout';
import { LeftOutlined } from '@ant-design/icons';

interface Props {
  title: string;
  subTitle: string;
  onBack: () => void;
}
const HeaderDetail: FC<Props> = ({ title, subTitle, onBack }) => (
  <Header
    className="h-[85px] !bg-white border-b-[1px] border-[#DFE5EE]"
    style={{ padding: 0, display: 'flex', alignItems: 'center' }}
  >
    <span className="mr-[21px] text-[#2F2F2F] cursor-pointer" onClick={onBack} role="presentation">
      <LeftOutlined />
    </span>
    <span className="mr-[24px]">{title}</span> <span className="mr-[24px] text-[#DFE5EE]">|</span>{' '}
    <span>{subTitle}</span>
  </Header>
);

export default HeaderDetail;
