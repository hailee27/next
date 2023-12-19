import MegaHead from '@/components/MegaHead';
import CampainLayout from '@/components/layout/CampainLayout';
import MainLayout from '@/components/layout/MainLayout';
import SignInLayout from '@/components/layout/SignInLayout';
import { wrapper } from '@/redux/store';
import '@/styles/globals.css';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { DM_Sans, Inter, M_PLUS_1, Montserrat, Noto_Sans_JP } from 'next/font/google';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mPlus1 = M_PLUS_1({ subsets: ['latin'], variable: '--font-m-plus-1', display: 'swap' });
const notoSans = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto-san-jp', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(pageProps);
  let getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  if (router.pathname.startsWith('/campain')) {
    getLayout = (page) => <CampainLayout>{page}</CampainLayout>;
  }
  if (router.pathname.startsWith('/auth/sign-in/campaign-creator')) {
    getLayout = (page) => <SignInLayout>{page}</SignInLayout>;
  }
  if (router.pathname === '/') {
    getLayout = (page) => <MainLayout>{page}</MainLayout>;
  }
  return (
    <SessionProvider session={session}>
      <MegaHead />
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.persistorData}>
          <main
            className={`${notoSans.className} ${dmSans.variable} ${inter.variable}  ${mPlus1.variable} ${notoSans.variable} ${montserrat.variable} font-sans`}
          >
            {getLayout(<Component {...props} />)}
          </main>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

export default App;
