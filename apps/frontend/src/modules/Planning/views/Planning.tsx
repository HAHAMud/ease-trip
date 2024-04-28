import NextLink from 'next/link';
import { useTheme, Grid } from '@ease-trip/easy-ui';
import { LOGO_NAME } from '@/constants';
import { AvatarDropdownMenu } from '@/modules/Auth/components';

export default function Planning() {
  const theme = useTheme();

  return (
    <Grid container direction="column">
      <Grid
        container
        alignItems="center"
        className="px-6 py-4"
        spacing="2"
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        <NextLink href="/" className="font-bold text-2xl text-black">
          {LOGO_NAME}
        </NextLink>

        <AvatarDropdownMenu />
      </Grid>
      <main></main>
    </Grid>
  );
}
