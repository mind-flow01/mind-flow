import type { NextPage } from 'next';

export type PageAuthConfig = {
  isProtected: boolean;
  // No futuro, pode adicionar mais regras aqui, como:
  // role?: string;
  // permissions?: string[];
};

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: PageAuthConfig;
};