import styled from '@emotion/styled';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
} from '@mui/material';
import { Controller, UseControllerProps, useController } from 'react-hook-form';

const StyledFormControl = styled(FormControl)({});

type EzCheckBoxProps = Omit<CheckboxProps, 'name' | 'value' | 'defaultValue'> &
  UseControllerProps &
  Pick<FormControlLabelProps, 'label'>;

export function EzCheckbox({ label, ...restProps }: EzCheckBoxProps) {
  const { control, name, rules, defaultValue, shouldUnregister, ...componentProps } = restProps;
  const controllerParams = { control, name, rules, defaultValue, shouldUnregister };
  const { fieldState } = useController(controllerParams);

  const helperText = fieldState.error?.message;

  return (
    <Controller
      {...restProps}
      render={({ field }) => (
        <StyledFormControl>
          <FormControlLabel control={<Checkbox {...field} {...componentProps} />} label={label} />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </StyledFormControl>
      )}
    />
  );
}
