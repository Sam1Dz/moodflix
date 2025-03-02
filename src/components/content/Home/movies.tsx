'use client';

import React from 'react';

/* REACT QUERY */
import { useSuspenseQuery } from '@tanstack/react-query';

/* MATERIAL UI */
import { Box, IconButton, Grid2 as Grid } from '@mui/material';

/* COMPONENTS */
import UIMovieCard from '@/components/ui/movie-card';
import { StyledH2, StyledP, StyledSpan } from '@/components/themes/styled';
import {
  textHeadlineSmall,
  textTitleLarge
} from '@/components/themes/utilities';

/* LIBRARIES */
import { MoviesByPopularity, SearchMovies } from '@/libs/fetcher';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useRouter, useSearchParams } from 'next/navigation';

/* TYPES */
interface HomePopularProps {
  page: number;
}

export const PaginationButton = styled(IconButton)({
  backgroundColor: 'var(--mui-palette-primary-main)',
  color: 'var(--mui-palette-primary-contrastText)',
  '&:hover': {
    backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.92)',
    color: 'rgba(var(--mui-palette-primary-contrastTextChannel) / 0.92)'
  }
});

export default function HomePopular({ page }: HomePopularProps) {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const scrollRef = React.useRef<HTMLHeadingElement | null>(null);

  // Fetch API
  const { data: dataPopular } = useSuspenseQuery(MoviesByPopularity(page));
  const { data: dataSearch } = useSuspenseQuery(SearchMovies(query, page));

  // Component Function
  const dataSources = query === '' ? dataPopular : dataSearch;

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    Router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <React.Fragment>
      <StyledH2
        ref={scrollRef}
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
        {dataSources.results.map((movie) => (
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

      <Box
        component="div"
        sx={{
          mt: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <PaginationButton
          disabled={page === 1}
          onClick={() => handleChangePage(page - 1)}
          aria-label="Previous page"
        >
          <ArrowBack />
        </PaginationButton>
        <StyledP sx={{ fontWeight: 'bold', ...textTitleLarge }}>
          {page}&nbsp;
          <StyledSpan sx={{ fontWeight: 'normal' }}>/</StyledSpan>&nbsp;
          <StyledSpan sx={{ fontWeight: 'normal' }}>
            {dataSources.total_pages}
          </StyledSpan>
        </StyledP>
        <PaginationButton
          disabled={page === dataSources.total_pages}
          onClick={() => handleChangePage(page + 1)}
          aria-label="Next page"
        >
          <ArrowForward />
        </PaginationButton>
      </Box>
    </React.Fragment>
  );
}
