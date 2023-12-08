import CampainLayout from '@/components/layout/CampainLayout';
import MainLayout from '@/components/layout/MainLayout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

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
  return getLayout(<Component {...pageProps} />);
}
