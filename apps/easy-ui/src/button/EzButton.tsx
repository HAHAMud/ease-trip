import styled from '@emotion/styled';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { variantComponentFactory, VariantComponentProps } from '../utils/utilityType';

export type EzButtonProps = ButtonProps;

const StyledButton = styled(Button)<EzButtonProps>({});

export function EzButton(props: EzButtonProps) {
  const context = useFormContext();

  const isLoading = context?.formState.isSubmitting;

  return (
    <StyledButton
      {...props}
      {...(isLoading
        ? {
            startIcon: <CircularProgress sx={{ mr: 1 }} size={14} />,
            disabled: true,
          }
        : null)}
    />
  );
}

export type EzContainedButtonProps = VariantComponentProps<EzButtonProps>;
export const EzContainedButton = variantComponentFactory(EzButton, {
  variant: 'contained',
}) as React.FC<EzContainedButtonProps>;

export type EzOutlinedButtonProps = VariantComponentProps<EzButtonProps>;
export const EzOutlinedButton = variantComponentFactory(EzButton, {
  variant: 'outlined',
}) as React.FC<EzOutlinedButtonProps>;

export type EzTextButtonProps = VariantComponentProps<EzButtonProps>;
export const EzTextButton = variantComponentFactory(EzButton, {
  variant: 'text',
}) as React.FC<EzTextButtonProps>;
