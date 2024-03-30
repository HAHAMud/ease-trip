import { useSnackbar } from 'notistack';

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return {
    success: (message: string) => enqueueSnackbar(message, { variant: 'success' }),
    info: (message: string) => enqueueSnackbar(message, { variant: 'info' }),
    warning: (message: string) => enqueueSnackbar(message, { variant: 'warning' }),
    error: (message: string) => enqueueSnackbar(message, { variant: 'error' }),
    close: closeSnackbar,
  };
};
