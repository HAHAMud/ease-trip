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
} from '@ease-trip/easy-ui';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
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
          <EzForm defaultValues={defaultValues} schema={loginSchema} onSubmit={handleSubmit}>
            <EzTextField fullWidth name="email" label="Email" />
            <EzTextField fullWidth name="password" type="password" label="密碼" />
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
