import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CampaignLayout from '@/components/layout/CampaignLayout';
import MainLayout from '@/components/layout/MainLayout';
import { persistor, store } from '@/redux/store';
import '@/styles/globals.css';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  let getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  if (router.pathname.startsWith('/campaign')) {
    getLayout = (page) => <CampaignLayout>{page}</CampaignLayout>;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  );
}
