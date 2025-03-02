'use client';

import React from 'react';

/* REACT QUERY */
import { useSuspenseQuery } from '@tanstack/react-query';

/* MATERIAL UI */
import { Grid2 as Grid } from '@mui/material';

/* COMPONENTS */
import UIMovieCard from '@/components/ui/movie-card';
import { StyledH2 } from '@/components/themes/styled';
import {
  textHeadlineSmall,
  textTitleLarge
} from '@/components/themes/utilities';

/* LIBRARIES */
import { MoviesByPopularity, SearchMovies } from '@/libs/fetcher';

interface HomePopularProps {
  page: number;
  query?: string;
}

export default function HomePopular({ page, query = '' }: HomePopularProps) {
  const { data: dataPopular } = useSuspenseQuery(MoviesByPopularity(page));
  const { data: dataSearch } = useSuspenseQuery(SearchMovies(query, page));

  return (
    <React.Fragment>
      <StyledH2
        sx={(theme) => ({
          fontWeight: 'bold',
          ...textHeadlineSmall,
          [theme.breakpoints.down('sm')]: textTitleLarge
        })}
        aria-label={
          query === '' ? 'Popular movie' : `Search Movie for "${query}"`
        }
      >
        {query === '' ? 'Popular' : `Search Movie "${query}"`}
      </StyledH2>

      <Grid component="div" container spacing={2} sx={{ mt: 5 }}>
        {(query === '' ? dataPopular : dataSearch).results.map((movie) => (
          <Grid
            key={movie.id}
            size={{
              xxs: 12,
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2.4
            }}
          >
            <UIMovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
