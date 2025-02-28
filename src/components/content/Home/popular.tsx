'use client';

import React from 'react';

/* MATERIAL UI */
import { Box } from '@mui/material';

/* COMPONENTS */
import {
  textHeadlineSmall,
  textTitleLarge
} from '@/components/themes/utilities';

export default function HomePopular() {
  return (
    <React.Fragment>
      <Box
        component="h2"
        sx={(theme) => ({
          fontWeight: 'bold',
          ...textHeadlineSmall,
          [theme.breakpoints.down('sm')]: textTitleLarge
        })}
      >
        Popular
      </Box>
    </React.Fragment>
  );
}
