import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  EzForm,
  EzTextField,
  EzCheckbox,
  EzIcon,
  IconButton,
} from '@ease-trip/easy-ui';
// import { Visibility, VisibilityOff } from '@ease-trip/easy-ui/icon';
import { defaultValues, loginSchema } from '../models';
import type { LoginForm } from '../models';

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function handleSubmit(data: LoginForm) {
    const { email, password } = data;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();
      if (response.ok) {
        router.push('/plan');
      } else {
        // Handle errors
        throw Error(payload);
      }
    } catch (err) {
      if (err instanceof Error) {
      }
    }
  }

  return (
    <Dialog open>
      <DialogTitle>Ease Trip</DialogTitle>
      <DialogContent>
        <Grid rowSpacing={2}>
          <EzForm defaultValues={defaultValues} schema={loginSchema} onSubmit={handleSubmit}>
            <EzTextField fullWidth name="email" label="Email" />
            <EzTextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <EzIcon name={showPassword ? 'VisibilityOff' : 'Visibility'} />
                </IconButton>
              }
            />

            <EzCheckbox name="rememberMe" label="keep me signed in." />

            <DialogActions>
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </DialogActions>
          </EzForm>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
