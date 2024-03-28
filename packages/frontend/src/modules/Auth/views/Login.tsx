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
  EzIconButton,
} from '@ease-trip/easy-ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { login } from '@/api/auth';
import { defaultValues, loginSchema } from '../models';
import type { LoginForm } from '../models';

export default function LoginPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('🚀 ~ LoginPage ~ data:', data);
      router.push('/plan');
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function handleSubmit(data: LoginForm) {
    return mutation.mutateAsync(data);
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
