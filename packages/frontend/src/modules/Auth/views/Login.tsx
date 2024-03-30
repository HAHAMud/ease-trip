import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  EzForm,
  EzTextField,
  EzCheckbox,
  EzIconButton,
  EzContainedButton,
} from '@ease-trip/easy-ui';
import { login } from '@/api/auth';
import { defaultValues, LoginForm, loginSchema } from '../models';

export default function LoginPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('🚀 ~ LoginPage ~ data:', data);
      // router.push('/plan');
    },
    onError(error, variables, context) {
      console.log('onError', error);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (data: LoginForm) => {
    mutation.mutateAsync(data);
  };

  return (
    <Dialog open>
      <DialogTitle>Ease Trip</DialogTitle>
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
  );
}
