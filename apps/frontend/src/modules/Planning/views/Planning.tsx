import { Inter } from 'next/font/google';
import NextLink from 'next/link';
import { hasCookie } from 'cookies-next';
import { useTheme, Grid } from '@ease-trip/easy-ui';
import { LOGO_NAME, AUTHORIZATION_COOKIE_NAME } from '@/constants';
import { AvatarDropdownMenu } from '@/modules/Auth/components';

const inter = Inter({ subsets: ['latin'] });

export default function Planning() {
  const hasAuth = hasCookie(AUTHORIZATION_COOKIE_NAME);
  const theme = useTheme();

  return (
    <Grid className={inter.className}>
      <Grid
        container
        alignItems="center"
        className="px-6 py-4"
        spacing="2"
        style={{ backgroundColor: theme.palette.secondary.main }}
      >
        <NextLink href={{ pathname: hasAuth === true ? '/' : '/login' }} className="font-bold text-2xl text-black">
          {LOGO_NAME}
        </NextLink>

        <AvatarDropdownMenu />
      </Grid>
      <main></main>
    </Grid>
  );
}
