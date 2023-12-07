import SignInLayout from '@/layouts/SignInLayout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { DM_Sans } from 'next/font/google';
import MegaHead from '@/components/MegaHead';

const dmSans = DM_Sans({ subsets: ['latin'] });

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  let getLayout = Component.getLayout ?? ((page) => <div>{page}</div>);

  const router = useRouter();

  if (router.pathname.startsWith('/auth')) {
    getLayout = (page) => <SignInLayout>{page}</SignInLayout>;
  }

  return (
    <>
      <MegaHead />
      <main className={dmSans.className}>{getLayout(<Component {...pageProps} />)}</main>
    </>
  );
}
