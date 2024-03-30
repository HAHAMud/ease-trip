import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Box, Divider, Typography } from '@mui/material';
import { SnackbarContent, CustomContentProps, closeSnackbar, useSnackbar } from 'notistack';
import { EzTextButton } from '../EzButton';
import { defaultPropsComponentFactory } from '../utils/utilityType';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // TODO: disable variants that are no longer supported
    paragraph: true;
    label: true;
    tiny: true;
    console: true;
    labelParagraph: true;
  }
}

export type EzToastProps = Partial<CustomContentProps>;

const ToastContainer = styled(Box)(() => ({
  width: 320,
  borderRadius: '4px',
}));

const ToastContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const ToastActions = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const EzToast = forwardRef<HTMLDivElement, EzToastProps>((props, ref) => {
  const { id, variant = 'info', message, autoHideDuration = 5000, ...rest } = props;
  const { closeSnackbar } = useSnackbar();

  return (
    <SnackbarContent ref={ref} {...rest}>
      <ToastContainer>
        <ToastContent>
          <Typography sx={{ overflowWrap: 'anywhere' }}>{message}</Typography>
        </ToastContent>
        <Divider />
        <ToastActions>
          <Box display="flex" gap={1}>
            <EzTextButton size="small" onClick={() => closeSnackbar(id)}>
              Dismiss
            </EzTextButton>
          </Box>
        </ToastActions>
      </ToastContainer>
    </SnackbarContent>
  );
});

EzToast.displayName = 'EzToast';

export type EzInfoToastProps = Omit<EzToastProps, 'variant'>;
export const EzInfoToast: React.FC<EzInfoToastProps> = defaultPropsComponentFactory(
  EzToast,
  { variant: 'info' },
  'EzInfoToast'
);

export type EzErrorToastProps = Omit<EzToastProps, 'variant'>;
export const EzErrorToast: React.FC<EzErrorToastProps> = defaultPropsComponentFactory(
  EzToast,
  { variant: 'error' },
  'EzErrorToast'
);

export type EzWarningToastProps = Omit<EzToastProps, 'variant'>;
export const EzWarningToast: React.FC<EzWarningToastProps> = defaultPropsComponentFactory(
  EzToast,
  { variant: 'warning' },
  'EzWarningToast'
);

export type EzSuccessToastProps = Omit<EzToastProps, 'variant'>;
export const EzSuccessToast: React.FC<EzSuccessToastProps> = defaultPropsComponentFactory(
  EzToast,
  { variant: 'success' },
  'EzSuccessToast'
);
