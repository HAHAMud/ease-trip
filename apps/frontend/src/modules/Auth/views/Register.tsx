import type { MouseEvent as ReactMouseEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
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
} from '@ease-trip/easy-ui';
import { defaultRegisterValues, RegisterFormProps, registerSchema } from '@/modules/Auth/models';
import { registerAccount } from '../apis';
import CheckEmailButton from './CheckEmailButton';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [checkServiceAgreement, setCheckService] = useState(false);
  const [checkBusinessAgreement, setBusinessService] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerAccount,
    onSuccess: () => {
      router.push('/login');
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

  const isSubmitAllow = isEmailCheck && checkServiceAgreement && checkBusinessAgreement;

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
              <EzForm defaultValues={defaultRegisterValues} schema={registerSchema} onSubmit={handleSubmit}>
                <EzTextField
                  fullWidth
                  name="email"
                  label="Email"
                  endAdornment={<CheckEmailButton isCheck={isEmailCheck} onChange={setIsEmailCheck} />}
                  onInput={() => {
                    setIsEmailCheck(false);
                  }}
                />
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
                <EzCheckbox
                  name="serviceAgreement"
                  label="同意服務條款"
                  onChange={(e) => {
                    setCheckService(e.target.checked);
                  }}
                />
                <EzCheckbox
                  name="businessAgreement"
                  label="同意蒐集資料做為商業用途"
                  onChange={(e) => {
                    setBusinessService(e.target.checked);
                  }}
                />
                <CardActions>
                  <Grid item ml="auto">
                    <EzContainedButton disabled={!isSubmitAllow} type="submit">
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
