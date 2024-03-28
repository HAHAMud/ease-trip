import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';
import { VariantComponent } from '../utils/utilityType';

export type EzButtonProps = ButtonProps;

const StyledButton = styled(Button)<EzButtonProps>({});

export function EzButton(props: EzButtonProps) {
  return <StyledButton {...props} />;
}

export function EzContainedButton(props: VariantComponent<EzButtonProps>) {
  return <StyledButton variant="contained" {...props} />;
}

export function EzOutlinedButton(props: VariantComponent<EzButtonProps>) {
  return <StyledButton variant="outlined" {...props} />;
}

export function EzTextButton(props: VariantComponent<EzButtonProps>) {
  return <StyledButton variant="text" {...props} />;
}
