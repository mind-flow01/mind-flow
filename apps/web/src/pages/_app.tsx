// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout'; // Importação default do Layout
import '../styles/globals.css'; // Importação do CSS global

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Rotas que NÃO devem ter o layout (incluindo a sidebar)
  // Certifique-se de que '/login' e '/' estão aqui se essas páginas não devem ter sidebar
  const noLayoutPaths = ['/login', '/'];

  // Determina se o Layout (com a Sidebar) deve ser exibido
  const showLayout = !noLayoutPaths.includes(router.pathname);

  return showLayout ? (
    // Se showLayout for true, a página é envolvida pelo Layout
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    // Caso contrário, a página é renderizada diretamente sem o Layout
    <Component {...pageProps} />
  );
}

export default MyApp;