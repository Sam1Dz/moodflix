import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

/* COMPONENTS */
import theme from '@/components/themes';

/* TYPES */
import type { ComponentWithChildrenReq } from '@/types';

export default function MuiMaterialProvider({
  children
}: ComponentWithChildrenReq) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
