import { TextField, TextFieldProps } from '@mui/material';
import { Controller, UseControllerProps, useController } from 'react-hook-form';

type EzTextFieldProps = Omit<TextFieldProps, 'name' | 'value' | 'defaultValue'> & UseControllerProps;

export function EzTextField(props: EzTextFieldProps) {
  const { control, name, rules, defaultValue, shouldUnregister } = props;
  const controllerParams = { control, name, rules, defaultValue, shouldUnregister };
  const { fieldState } = useController(controllerParams);

  return (
    <Controller
      {...props}
      render={({ field }) => (
        <TextField {...field} helperText={fieldState.error?.message} error={Boolean(fieldState.error)} />
      )}
    />
  );
}
