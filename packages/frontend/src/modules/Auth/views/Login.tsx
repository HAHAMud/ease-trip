import { Fragment, MouseEvent as ReactMouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import {
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Snackbar,
  Slide,
  EzForm,
  EzTextField,
  EzCheckbox,
  EzIconButton,
  EzButton,
  EzContainedButton,
} from '@ease-trip/easy-ui';

import { login } from '@/api/auth';
import { defaultValues, LoginForm, loginSchema } from '../models';
import { LOGO_NAME } from '@/constants';

export default function LoginPage() {
  const router = useRouter();
  const [hasError, setHasError] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('🚀 ~ LoginPage ~ data:', data);
      // router.push('/plan');
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (data: LoginForm) => {
    setHasError(false);
    mutation.mutateAsync(data).catch(() => {
      setHasError(true);
    });
  };

  const handleTitleClick = () => {
    router.push('/login');
  }

  return (
    <Fragment>
      <Dialog open>
        <DialogTitle>
          <EzButton onClick={handleTitleClick}>
            {LOGO_NAME}
          </EzButton>
        </DialogTitle>
        <DialogContent>
          <Grid rowSpacing={2}>
            <EzForm
              defaultValues={defaultValues}
              schema={loginSchema}
              onSubmit={handleSubmit}
              onError={() => {
                console.log('EzForm on form empty');
              }}
            >
              <EzTextField fullWidth name="email" label="Email" />
              <EzTextField
                fullWidth
                required
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
              <DialogActions>
                <EzContainedButton type="submit">Sign In</EzContainedButton>
              </DialogActions>
            </EzForm>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={hasError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          login failure
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
