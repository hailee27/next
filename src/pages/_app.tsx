import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CampainLayout from '@/components/layout/CampainLayout';
import MainLayout from '@/components/layout/MainLayout';
import { persistor, store } from '@/redux/store';
import SignInLayout from '@/components/layout/SignInLayout';
import '@/styles/globals.css';

import { DM_Sans } from 'next/font/google';
import MegaHead from '@/components/MegaHead';

const dmSans = DM_Sans({ subsets: ['latin'] });

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  let getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  if (router.pathname.startsWith('/campain')) {
    getLayout = (page) => <CampainLayout>{page}</CampainLayout>;
  }
  if (router.pathname.startsWith('/auth')) {
    getLayout = (page) => <SignInLayout>{page}</SignInLayout>;
  }
  return (
    <>
      <MegaHead />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <main className={dmSans.className}>{getLayout(<Component {...pageProps} />)}</main>
        </PersistGate>
      </Provider>
    </>
  );
}
