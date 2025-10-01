import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        // TODO: replace with Supabase auth or custom logic
        return { id: 'demo-user', name: 'Demo User', email: credentials.email } as any;
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  pages: {},
};

export default NextAuth(authOptions);



