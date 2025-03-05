'use client';

import NextTopLoader from 'nextjs-toploader';

/* MATERIAL UI */
import { useTheme } from '@mui/material';

export default function TopLoader() {
  const Theme = useTheme();

  return (
    <NextTopLoader color={Theme.palette.primary.main} showSpinner={false} />
  );
}
