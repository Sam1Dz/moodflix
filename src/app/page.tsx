import React from 'react';

/* REACT QUERY */
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

/* MATERIAL UI */
import { Box, Container } from '@mui/material';

/* COMPONENTS */
import HomeHero from '@/components/content/Home/hero';
import HomeDecor from '@/components/content/Home/decor';
import HomeSearch from '@/components/content/Home/search';
import HomeMovies from '@/components/content/Home/movies';

/* LIBRARIES */
import { getQueryClient } from '@/libs/get-query-client';
import { MoviesByPopularity, SearchMovies } from '@/libs/fetcher';

interface RootPageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function RootPage({ searchParams }: RootPageProps) {
  const query = (await searchParams).query || '';
  const page = Number((await searchParams).page) || 1;

  /* Fetch API */
  // MoviesByPopularity
  const queryClientPopularity = getQueryClient();
  void queryClientPopularity.prefetchQuery(MoviesByPopularity(page));
  // SearchMovies
  const queryClientSearch = getQueryClient();
  if (query.length > 0) {
    void queryClientSearch.prefetchQuery(SearchMovies(query, page));
  }

  return (
    <Box component="main">
      <HomeDecor />

      <Container maxWidth="xl" sx={{ my: 6.5 }}>
        <Box
          component="header"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <HomeHero />
          <HomeSearch />
        </Box>
        <Box component="section" sx={{ mt: 5 }}>
          {query === '' ? (
            <HydrationBoundary state={dehydrate(queryClientPopularity)}>
              <HomeMovies page={page} />
            </HydrationBoundary>
          ) : (
            <HydrationBoundary state={dehydrate(queryClientSearch)}>
              <HomeMovies page={page} query={query} />
            </HydrationBoundary>
          )}
        </Box>
      </Container>
    </Box>
  );
}
