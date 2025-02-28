import React from 'react';

/* MATERIAL UI */
import { Box, Container } from '@mui/material';

/* COMPONENTS */
import HomeDecor from '@/components/content/Home/decor';
import HomeHero from '@/components/content/Home/hero';

export default function RootPage() {
  return (
    <Box component="main">
      <HomeDecor />

      <Container
        maxWidth="lg"
        sx={{
          mt: 6.5
        }}
      >
        <Box
          component="header"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <HomeHero />
        </Box>
      </Container>
    </Box>
  );
}
