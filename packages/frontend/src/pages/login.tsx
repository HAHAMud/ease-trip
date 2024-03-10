import type { ChangeEvent as ReactChangeEvent } from 'react';

import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from '@ease-trip/easy-ui';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function handleSubmit() {
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
          <TextField
            fullWidth
            required
            id="standard-basic"
            label="Email"
            variant="standard"
            margin="normal"
            value={email}
            onChange={(event: ReactChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          />

          <TextField
            fullWidth
            required
            id="standard-basic"
            label="密碼"
            variant="standard"
            margin="normal"
            value={password}
            onChange={(event: ReactChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />

          <FormControlLabel control={<Checkbox />} label="keep me signed in." />

          <DialogActions>
            <Button variant="contained" onClick={handleSubmit}>
              Sign In
            </Button>
          </DialogActions>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
