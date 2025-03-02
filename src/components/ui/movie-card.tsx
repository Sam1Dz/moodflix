'use client';

import React from 'react';

/* MATERIAL UI */
import {
  Card,
  Stack,
  Skeleton,
  CardMedia,
  CardContent,
  CardActionArea
} from '@mui/material';
// Icon
import StarRateIcon from '@mui/icons-material/StarRate';

/* COMPONENTS */
import { StyledH3, StyledP, StyledSpan } from '@/components/themes/styled';
import { textBodyLarge, textTitleMedium } from '@/components/themes/utilities';

/* TYPES */
import type { BaseMovie } from '@/types';

interface UIMovieCardProps {
  movie: BaseMovie;
}

export function UIMovieCardSkeleton() {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      sx={{ height: 444, borderRadius: 3 }}
    />
  );
}

export default function UIMovieCard({ movie }: UIMovieCardProps) {
  const Divider = () => (
    <StyledSpan
      sx={{ color: 'var(--mui-palette-text-secondary)' }}
      aria-hidden="true"
    >
      •
    </StyledSpan>
  );

  return (
    <Card
      component="article"
      elevation={0}
      sx={{
        borderRadius: 3,
        backgroundColor: 'var(--my-surf-container-highest)'
      }}
      aria-label={`Movie card for ${movie.title}`}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="368"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : '/images/no-movie.png'
          }
          alt={movie.title}
          sx={{ borderRadius: 3 }}
        />
        <CardContent
          sx={{
            p: 1.5
          }}
        >
          <StyledH3
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              ...textTitleMedium
            }}
            aria-label={`Movie title: ${movie.title}`}
          >
            {movie.title}
          </StyledH3>

          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            sx={{ mt: 0.5 }}
          >
            <Stack
              spacing={0.5}
              direction="row"
              alignItems="center"
              aria-label={`Movie rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`}
            >
              <StarRateIcon sx={{ fontSize: 16 }} aria-hidden="true" />
              <StyledP sx={{ fontWeight: 'bold', ...textBodyLarge }}>
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </StyledP>
            </Stack>

            <Divider />
            <StyledP
              sx={{
                fontWeight: 500,
                color: 'var(--mui-palette-text-secondary)',
                textTransform: 'capitalize',
                ...textBodyLarge
              }}
              aria-label={`Movie language: ${movie.original_language}`}
            >
              {movie.original_language}
            </StyledP>

            <Divider />
            <StyledP
              sx={{
                fontWeight: 500,
                color: 'var(--mui-palette-text-secondary)',
                ...textBodyLarge
              }}
              aria-label={`Movie release year: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}`}
            >
              {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
            </StyledP>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
