import styled from '@emotion/styled';
import { IconButton, IconButtonProps } from '@mui/material';
import { EzIcon, EzIconName } from '../EzIcon';

export type EzIconButtonProps = IconButtonProps & {
  name: EzIconName;
};

const StyledIconButton = styled(IconButton)<IconButtonProps>({});

export function EzIconButton({ name, ...props }: EzIconButtonProps) {
  return (
    <StyledIconButton {...props}>
      <EzIcon name={name} />
    </StyledIconButton>
  );
}
