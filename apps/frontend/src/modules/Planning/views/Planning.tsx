import { Inter } from 'next/font/google';
import NextLink from 'next/link';
import { hasCookie } from 'cookies-next';
import { Grid } from '@ease-trip/easy-ui';
import { LOGO_NAME, AUTHORIZATION_COOKIE_NAME } from '@/constants';
const inter = Inter({ subsets: ['latin'] });

export default function Planning() {
  const hasAuth = hasCookie(AUTHORIZATION_COOKIE_NAME);

  return (
    <section className={inter.className}>
      <header className="h-40 flex">
        <NextLink href={{ pathname: hasAuth === true ? '/' : '/login' }}>{LOGO_NAME}</NextLink>
      </header>
      <main></main>
    </section>
  );
}
