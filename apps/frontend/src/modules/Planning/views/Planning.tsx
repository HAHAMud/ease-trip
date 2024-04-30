import NextLink from 'next/link';
import { Grid, Box } from '@ease-trip/easy-ui';
import { LOGO_NAME } from '@/constants';
import { AvatarDropdownMenu } from '@/modules/Auth/components';

export default function Planning() {
  return (
    <Grid container direction="column">
      <Box
        display="flex"
        alignItems="center"
        paddingX="24px"
        paddingY="16px"
        sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}
      >
        <NextLink href="/" className="font-bold text-2xl text-black">
          {LOGO_NAME}
        </NextLink>

        <AvatarDropdownMenu />
      </Box>
      <Box component="main"></Box>
    </Grid>
  );
}
