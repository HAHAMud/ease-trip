import styled from '@emotion/styled';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, UseControllerProps, useController } from 'react-hook-form';

type EzTextFieldProps = Omit<TextFieldProps, 'name' | 'value' | 'defaultValue'> & UseControllerProps;

const StyledTextField = styled(TextField)<EzTextFieldProps>(() => ({
  variant: 'standard',
  margin: 'normal',
}));

export function EzTextField(props: EzTextFieldProps) {
  const { control, name, rules, defaultValue, shouldUnregister, ...componentProps } = props;
  const controllerParams = { control, name, rules, defaultValue, shouldUnregister };
  const { fieldState } = useController(controllerParams);

  const { variant = 'standard', margin = 'normal' } = componentProps;

  return (
    <Controller
      {...props}
      render={({ field }) => (
        <StyledTextField
          {...field}
          {...componentProps}
          margin={margin}
          variant={variant}
          helperText={fieldState.error?.message ?? ''}
          error={Boolean(fieldState.error)}
        />
      )}
    />
  );
}
