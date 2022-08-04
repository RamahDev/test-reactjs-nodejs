import { useSnackbar } from 'react-simple-snackbar';

export const useCustomSnackbar = () =>
  useSnackbar({
    position: 'bottom-center',
    style: { background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', zIndex: 999999999 },
  });
