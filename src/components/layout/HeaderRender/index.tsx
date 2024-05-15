import { useContext } from 'react';
import { Layout } from 'antd';

import { LayoutContext, LayoutContextInterface } from '@/components/pages/context/LayoutContext';

const { Header } = Layout;

const HeaderRender = ({
  title,
  buttonExtend,
}: {
  title?: string | React.ReactNode;
  buttonExtend?: React.ReactNode;
}) => {
  const { collapsed } = useContext<LayoutContextInterface>(LayoutContext);

  return (
    <div className="mb-[61px]">
      <Header
        className="h-[60px] !bg-white w-full shadow-sm"
        style={{
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 3,
        }}
      >
        <div className="font-bold uppercase flex w-full justify-between">
          <div style={{ paddingLeft: collapsed ? 80 : 224 }}> {title}</div>
          {buttonExtend ? <div className="mr-6">{buttonExtend}</div> : null}
        </div>
      </Header>
    </div>
  );
};

HeaderRender.defaultProps = {
  title: '',
  buttonExtend: undefined,
};

export default HeaderRender;
