import NextLink from 'next/link';
import { useTheme, Grid, Box } from '@ease-trip/easy-ui';
import { LOGO_NAME } from '@/constants';
import { AvatarDropdownMenu } from '@/modules/Auth/components';

export default function Planning() {
  const theme = useTheme();

  return (
    <Grid container direction="column">
      <Box
        display="flex"
        alignItems="center"
        sx={{ backgroundColor: theme.palette.secondary.main, paddingX: '24px', paddingY: '16px' }}
      >
        <NextLink href="/" className="font-bold text-2xl text-black">
          {LOGO_NAME}
        </NextLink>

        <AvatarDropdownMenu />
      </Box>
      <main></main>
    </Grid>
  );
}
