import '@/styles/globals.css';
import '@/styles/globals.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import jaJP from 'antd/locale/ja_JP';
import { ConfigProvider } from 'antd';

import Loading from '@/components/Loading';
import { wrapper } from '@/redux/store';
import { PopUpProvider } from '@/context/PopUpContext';
import MainLayout from '@/components/layout/MainLayout';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { store, props } = wrapper.useWrappedStore(pageProps);
  let getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  if (router.pathname === '/') {
    getLayout = (page) => <MainLayout>{page}</MainLayout>;
  }

  useEffect(() => {
    const start = (url) => {
      if (!url?.startsWith('/campaigns')) {
        setLoading(true);
      }
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      {/* <MegaHead /> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.persistorData}>
          <main>
            <ConfigProvider locale={jaJP}>
              <PopUpProvider>
                {loading && <Loading />}
                {getLayout(<Component {...props} />)}
              </PopUpProvider>
            </ConfigProvider>
          </main>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
