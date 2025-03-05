import React from 'react';

/* MATERIAL UI */
import { Box, Container } from '@mui/material';

/* COMPONENTS */
import HomeHero from '@/components/content/home/hero';
import HomeDecor from '@/components/content/home/decor';
import HomeSearch from '@/components/content/home/search';
import HomeMovies from '@/components/content/home/movies';

/* LIBRARIES */
import { GetMoviesByPopularity, SearchMovies } from '@/libs/fetcher';

/* TYPES */
import { GetMovies } from '@/types';

interface RootPageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: RootPageProps) {
  const query = (await searchParams).query || '';
  const page = Number((await searchParams).page) || 1;

  let data: GetMovies | null = null;
  let isError = false;

  // Fetch API
  try {
    const response =
      query === ''
        ? await GetMoviesByPopularity(page)
        : await SearchMovies(query, page);

    if (!response.ok) {
      throw new Error(
        "An error occurred while fetching movies. ('src/app/page.tsx')"
      );
    }

    data = await response.json();
  } catch (error) {
    console.error(error);
    isError = true;
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
          <HomeMovies data={data} isError={isError} />
        </Box>
      </Container>
    </Box>
  );
}
