import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  EzForm,
  EzTextField,
  EzCheckbox,
  EzIconButton,
  EzContainedButton,
  useToast,
  Typography,
} from '@ease-trip/easy-ui';
import { register } from '@/api/auth';
import { defaultRegisterValues, RegisterFormProps, registerSchema } from '@/modules/Auth/models';

export default function RegisterForm() {
  const fromRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('🚀 ~ register result ~ data:', data);

      // setStorageItem('ez-token', data.token);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (data: RegisterFormProps) => {
    return mutation.mutateAsync(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log('fromRef', fromRef);
  }, []);

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
          <CardHeader title="Register" />
          <CardContent>
            <Grid rowSpacing={2}>
              <EzForm
                ref={fromRef}
                defaultValues={defaultRegisterValues}
                schema={registerSchema}
                onSubmit={handleSubmit}
              >
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
                <EzTextField fullWidth name="city" label="city(option)" type="text" />
                <EzCheckbox name="serviceAgreement" label="同意服務條款" />
                <EzCheckbox name="businessAgreement" label="同意蒐集資料做為商業用途" />
                <CardActions>
                  <Grid item ml="auto">
                    <EzContainedButton type="submit" disabled>
                      submit
                    </EzContainedButton>
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
