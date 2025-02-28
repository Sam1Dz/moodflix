import React from 'react';

/* MATERIAL UI */
import { Box, Container } from '@mui/material';

/* COMPONENTS */
import HomeHero from '@/components/content/Home/hero';
import HomeSearch from '@/components/content/Home/search';
import HomePopular from '@/components/content/Home/popular';

/* TYPES */
interface RootPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function RootPage({ searchParams }: RootPageProps) {
  const query = (await searchParams).query || '';

  return (
    <Box component="main">
      <Container
        maxWidth="lg"
        sx={{
          my: 6.5
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
          <HomeSearch query={query} />
        </Box>
        <Box
          component="section"
          sx={{
            mt: 5
          }}
        >
          <HomePopular />
        </Box>
      </Container>
    </Box>
  );
}
