import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';

export type EzButtonProps = ButtonProps;

const StyledButton = styled(Button)<EzButtonProps>({});

export default function EzButton(props: EzButtonProps) {
  return <StyledButton {...props} />;
}
