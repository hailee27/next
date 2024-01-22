/* eslint-disable import/first */
/* eslint-disable import/order */
import { init as initApm } from '@elastic/apm-rum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceVersion = require('../../package.json').version;

initApm({
  serviceName: `${process.env.NEXT_PUBLIC_SERVICE_NAME}-rum`,
  serverUrl: process.env.NEXT_PUBLIC_APM_SERVER_URL ?? 'http://localhost:8200',
  serviceVersion,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'local',
  apiVersion: 3,
  distributedTracingOrigins: [process.env.NEXT_PUBLIC_APM_API_BASE_URL ?? 'http://localhost:8080'],
  active: ['staging', 'production'].includes(process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'local'),
});
//* * */

import AuthCheck from '@/components/AuthCheck';
import Loading from '@/components/Loading';
import MegaHead from '@/components/MegaHead';
import CampaignCreatorAuthLayout from '@/components/layout/CampaignCreatorAuthLayout';
import CampaignLayout from '@/components/layout/CampaignLayout';
import MainLayout from '@/components/layout/MainLayout';
import { PopUpProvider } from '@/context/PopUpContext';
import { wrapper } from '@/redux/store';
import '@/styles/globals.css';
import '@/styles/globals.scss';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import TwitterCallBackLayout from '@/components/layout/TwitterCallBackLayout';

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
  if (router.pathname.startsWith('/campaign-creator')) {
    getLayout = (page) => (
      <AuthCheck type="CREATOR">
        <CampaignLayout>{page}</CampaignLayout>
      </AuthCheck>
    );
  }

  if (router.pathname.startsWith('/campaigns')) {
    getLayout = (page) => <MainLayout>{page}</MainLayout>;
  }
  if (
    router.pathname === '/auth/sign-in/campaign-creator' ||
    router.pathname === '/auth/sign-in/campaign-creator/verification'
  ) {
    getLayout = (page) => <CampaignCreatorAuthLayout>{page}</CampaignCreatorAuthLayout>;
  }
  if (router.pathname === '/') {
    getLayout = (page) => <MainLayout>{page}</MainLayout>;
  }

  if (router.pathname.startsWith('/my-page')) {
    getLayout = (page) => <MainLayout>{page}</MainLayout>;
  }
  if (router.pathname === '/auth/callback/twitter') {
    getLayout = (page) => <TwitterCallBackLayout>{page}</TwitterCallBackLayout>;
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
