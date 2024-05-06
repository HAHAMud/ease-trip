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
  useFormContext,
} from '@ease-trip/easy-ui';
import { registerAccount } from '@/api/auth';
import { defaultRegisterValues, RegisterForm, registerSchema } from '@/modules/Auth/models';
import CheckEmailButton from './CheckEmailButton';

function FormContent() {
  const { setValue } = useFormContext<RegisterForm>();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <EzTextField
        fullWidth
        name="email"
        label="Email"
        endAdornment={<CheckEmailButton />}
        onInput={() => {
          setValue('emailChecked', false);
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
          />
        }
      />
      <EzTextField fullWidth name="city" label="city(option)" type="text" />
      <EzCheckbox name="serviceAgreement" label="同意服務條款" />
      <EzCheckbox name="businessAgreement" label="同意蒐集資料做為商業用途" />

      <CardActions>
        <Grid item ml="auto">
          <EzContainedButton type="submit">submit</EzContainedButton>
        </Grid>
      </CardActions>
    </>
  );
}

export default function Register() {
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

  const handleSubmit = async (data: RegisterForm) => {
    // TODO: data.emailChecked

    return mutation.mutateAsync(data);
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
          <CardHeader title="Register" />
          <CardContent>
            <Grid rowSpacing={2}>
              <EzForm defaultValues={defaultRegisterValues} schema={registerSchema} onSubmit={handleSubmit}>
                <FormContent />
              </EzForm>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
