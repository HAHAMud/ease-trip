import { useRouter } from 'next/router';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  EzFormProvider,
  EzTextField,
  EzCheckbox,
} from '@ease-trip/easy-ui';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

type LoginForm = z.infer<typeof loginSchema>;

const defaultValues: LoginForm = {
  email: '',
  password: '',
  rememberMe: false,
};

export default function LoginPage() {
  const router = useRouter();

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
          <EzFormProvider defaultValues={defaultValues} schema={loginSchema} onSubmit={handleSubmit}>
            <EzTextField name="email" />
            <EzTextField name="password" type="password" />
            <EzCheckbox name="rememberMe" label="keep me signed in." />

            <DialogActions>
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </DialogActions>
          </EzFormProvider>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
