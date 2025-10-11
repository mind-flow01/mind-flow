import { PageAuthConfig } from '@/types/page-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

const Loading = () => <p>Carregando...</p>;

type AuthGuardProps = {
  children: ReactElement & { type: { auth?: PageAuthConfig } };
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const authConfig = children.type.auth || { isProtected: false };
  const isUser = !!session?.user;
  const isProtected = authConfig.isProtected === true;

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!isUser && isProtected) {
      router.push({
        pathname: '/login', 
        query: { callbackUrl: router.asPath }, 
      });
    }
  }, [isUser, isProtected, status, router]);
  
  if (status === 'loading' && isProtected) {
    return <Loading />;
  }

  if (isUser && isProtected) {
    return children;
  }
  
  if (!isProtected) {
    return children;
  }

  return <Loading />;
}