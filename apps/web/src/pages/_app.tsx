import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { NextPageWithAuth } from '@/types/page-auth';

type AppPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) {
  const router = useRouter();

  const noLayoutPaths = ['/login', '/'];
  const showLayout = !noLayoutPaths.includes(router.pathname);

  return (
    <SessionProvider session={session}>
      {showLayout ? (
        <Layout>
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </Layout>
      ) : (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      )}
    </SessionProvider>
  );
}

export default MyApp;