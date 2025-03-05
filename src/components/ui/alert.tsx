'use client';

/* MATERIAL UI */
import { Alert, AlertProps } from '@mui/material';

/* COMPONENTS */
import { textBodyLarge } from '@/components/themes/utilities';

interface UIAlertProps {
  message: string;
  sx?: AlertProps['sx'];
  severity?: Exclude<AlertProps['severity'], 'warning' | 'success'>;
}

export default function UIAlert({
  message,
  sx,
  severity = 'info'
}: UIAlertProps) {
  return (
    <Alert
      variant="filled"
      elevation={0}
      severity={severity}
      sx={{
        borderRadius: 3,
        boxShadow: 'none',
        backgroundColor:
          severity === 'info'
            ? 'var(--my-primary-container)'
            : 'var(--my-error-container)',
        color:
          severity === 'info'
            ? 'var(--my-primary-on-container)'
            : 'var(--my-error-on-container)',
        ...textBodyLarge,
        '.MuiAlert-icon': {
          fontSize: 26
        },
        ...sx
      }}
    >
      {message}
    </Alert>
  );
}
