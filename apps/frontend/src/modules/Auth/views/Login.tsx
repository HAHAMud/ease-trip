import type { MouseEventHandler, MouseEvent as ReactMouseEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  EzCheckbox,
  EzContainedButton,
  EzForm,
  EzIconButton,
  EzTextField,
  EzTypography,
  Grid,
  useToast,
} from '@ease-trip/easy-ui';
import { login } from '@/api/auth';
import { LOGO_NAME } from '@/constants';
import { setStorageItem } from '@/utils';
import { defaultValues, LoginForm, loginSchema } from '../models';

export const registerSlogan = `Don't have an account? Create one?`;

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('🚀 ~ LoginPage ~ data:', data);
      setStorageItem('ez-token', data.token);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (data: LoginForm) => {
    return mutation.mutateAsync(data);
  };

  const handleTitleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <Grid
      container
      height="100dvh"
      alignItems="center"
      justifyContent="center"
      columns={{ xs: 1, sm: 4, md: 8, lg: 12 }}
    >
      <Grid item xs={1} sm={2}>
        <Card sx={{ minWidth: 390, maxWidth: 540 }}>
          <CardHeader
            component={() => (
              <Link href="/login" onClick={handleTitleClick}>
                <EzTypography variant="h5" mt={1} mx={2}>
                  {LOGO_NAME}
                </EzTypography>
              </Link>
            )}
          />
          <CardContent>
            <Grid rowSpacing={2}>
              <EzForm defaultValues={defaultValues} schema={loginSchema} onSubmit={handleSubmit}>
                <EzTextField fullWidth name="email" label="Email" />
                <EzTextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <EzIconButton
                      name={showPassword ? 'VisibilityOff' : 'Visibility'}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    />
                  }
                />
                <EzCheckbox name="rememberMe" label="keep me signed in." />
                <EzTypography variant="body2">
                  <Link href="/register">{registerSlogan}</Link>
                </EzTypography>
                <CardActions>
                  <Grid item ml="auto">
                    <EzContainedButton type="submit">Sign In</EzContainedButton>
                  </Grid>
                </CardActions>
              </EzForm>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
