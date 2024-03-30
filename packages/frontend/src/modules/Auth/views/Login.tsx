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
  EzButton,
  EzContainedButton,
  useToast,
} from '@ease-trip/easy-ui';
import { login } from '@/api/auth';
import { LOGO_NAME } from '@/constants';
import { defaultValues, LoginForm, loginSchema } from '../models';

type Props = {
  open?: boolean;
};

export default function LoginPage({ open = true }: Props) {
  const router = useRouter();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('🚀 ~ LoginPage ~ data:', data);
      // router.push('/plan');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
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

  const handleTitleClick = () => {
    router.push('/login');
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <EzButton onClick={handleTitleClick}>{LOGO_NAME}</EzButton>
        </DialogTitle>
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
                <EzContainedButton type="submit">Sign In</EzContainedButton>
              </DialogActions>
            </EzForm>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
