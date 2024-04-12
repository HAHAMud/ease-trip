import { z } from 'zod';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  EzForm,
  EzTextField,
} from '@ease-trip/easy-ui';

const loginSchema = z.object({
  text: z.string().regex(/^[A-Za-z]+$/, '只能英文字'),
  text2: z.string().refine((val) => !val.includes('0'), '不能有0'),
});

type LoginForm = z.infer<typeof loginSchema>;

const defaultValues: LoginForm = {
  text: '',
  text2: '',
};

export default function ZodPage() {
  const onSubmit = async (data: LoginForm) => {
    return false;
  };

  return (
    <Dialog open>
      <DialogTitle>Ease Trip</DialogTitle>
      <DialogContent>
        <Grid rowSpacing={2}>
          <EzForm defaultValues={defaultValues} schema={loginSchema} onSubmit={onSubmit}>
            <EzTextField fullWidth name="text" label="Text" />

            <EzTextField fullWidth name="text2" label="RegExp" />

            <DialogActions>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </DialogActions>
          </EzForm>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
