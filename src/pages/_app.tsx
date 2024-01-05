import { NextPage } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import MegaHead from '@/components/MegaHead';
import MainLayout from '@/components/layout/MainLayout';
import CampaignLayout from '@/components/layout/CampaignLayout';
import SignInLayout from '@/components/layout/SignInLayout';
import { PopUpProvider } from '@/context/PopUpContext';
import Loading from '@/components/Loading';
import { wrapper } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import AuthCheck from '@/components/AuthCheck';

// import { DM_Sans, Inter, M_PLUS_1, Montserrat, Noto_Sans_JP } from 'next/font/google';
// const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
// const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// const mPlus1 = M_PLUS_1({ subsets: ['latin'], variable: '--font-m-plus-1', display: 'swap' });
// const notoSans = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto-san-jp', display: 'swap' });
// const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
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
  if (router.pathname.startsWith('/campaign')) {
    getLayout = (page) => (
      <AuthCheck>
        <CampaignLayout>{page}</CampaignLayout>
      </AuthCheck>
    );
  }

  if (router.pathname.startsWith('/campaigns')) {
    getLayout = (page) => <MainLayout>{page}</MainLayout>;
  }
  if (router.pathname.startsWith('/auth/sign-in/campaign-creator')) {
    getLayout = (page) => <SignInLayout>{page}</SignInLayout>;
  }
  if (router.pathname === '/') {
    getLayout = (page) => <MainLayout>{page}</MainLayout>;
  }

  useEffect(() => {
    const start = () => {
      setLoading(true);
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
    <SessionProvider session={session}>
      <MegaHead />
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.persistorData}>
          {/* <main
            className={` ${dmSans.variable} ${inter.variable}  ${mPlus1.variable} ${notoSans.variable} ${montserrat.variable}`}
          > */}
          <PopUpProvider>
            {loading && <Loading />}
            {getLayout(<Component {...props} />)}
          </PopUpProvider>
          {/* </main> */}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

export default App;
