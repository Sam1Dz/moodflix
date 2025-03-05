'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useSearchParams } from 'next/navigation';

/* MATERIAL UI */
import { styled } from '@mui/material/styles';
import { IconButton, Grid2 as Grid } from '@mui/material';
// Icons
import { ArrowBack, ArrowForward } from '@mui/icons-material';

/* COMPONENTS */
import UIAlert from '@/components/ui/alert';
import UIMovieCard from '@/components/ui/movie-card';
import {
  StyledH2,
  StyledNav,
  StyledP,
  StyledSpan
} from '@/components/themes/styled';
import {
  textHeadlineSmall,
  textTitleLarge
} from '@/components/themes/utilities';

/* TYPES */
import { GetMovies } from '@/types';

interface HomeMoviesProps {
  data: GetMovies | null;
  isError?: boolean;
}

const titleToLink = (value: string) => value.toLowerCase().replaceAll(' ', '-');
const PaginationButton = styled(IconButton)({
  backgroundColor: 'var(--mui-palette-primary-main)',
  color: 'var(--mui-palette-primary-contrastText)',
  '&:hover': {
    backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.92)',
    color: 'rgba(var(--mui-palette-primary-contrastTextChannel) / 0.92)'
  }
});

export default function HomeMovies({ data, isError }: HomeMoviesProps) {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;

  const scrollRef = React.useRef<HTMLHeadingElement | null>(null);

  // Component Function
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
          query === '' ? 'Popular movies' : `Search results for "${query}"`
        }
      >
        {query === '' ? 'Popular' : `Search Movie "${query}"`}
      </StyledH2>

      {!isError ? (
        data && data.results.length > 0 ? (
          <React.Fragment>
            <Grid component="div" container spacing={2} sx={{ mt: 5 }}>
              {data!.results.map((movie) => (
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
                  <NextLink href={`/${movie.id}/${titleToLink(movie.title)}`}>
                    <UIMovieCard movie={movie} />
                  </NextLink>
                </Grid>
              ))}
            </Grid>

            <StyledNav
              sx={{
                mt: 2.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              aria-label="Pagination controls"
            >
              <PaginationButton
                disabled={page === 1}
                onClick={() => handleChangePage(page - 1)}
                aria-label="Go to previous page"
              >
                <ArrowBack />
              </PaginationButton>
              <StyledP
                sx={{ fontWeight: 'bold', ...textTitleLarge }}
                aria-current={page === Number(page) ? 'page' : undefined}
              >
                {page}&nbsp;
                <StyledSpan sx={{ fontWeight: 'normal' }}>/</StyledSpan>&nbsp;
                <StyledSpan sx={{ fontWeight: 'normal' }}>
                  {data!.total_pages}
                </StyledSpan>
              </StyledP>
              <PaginationButton
                disabled={page === data!.total_pages}
                onClick={() => handleChangePage(page + 1)}
                aria-label="Go to next page"
              >
                <ArrowForward />
              </PaginationButton>
            </StyledNav>
          </React.Fragment>
        ) : (
          <UIAlert
            message={`Movie${query && ` "${query}" `}not found.`}
            severity="info"
            sx={{ mt: 2.5 }}
          />
        )
      ) : (
        <UIAlert
          message="Failed to fetch movies!"
          severity="error"
          sx={{ mt: 2.5 }}
        />
      )}
    </React.Fragment>
  );
}
