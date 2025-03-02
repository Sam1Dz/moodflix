'use client';

import React from 'react';

/* REACT QUERY */
import { useSuspenseQuery } from '@tanstack/react-query';

/* COMPONENTS */
import DetailHeader from './header';

/* LIBRARIES */
import { DetailMovie } from '@/libs/fetcher';

interface DetailContentProps {
  movieId: string;
}

export default function DetailContent({ movieId }: DetailContentProps) {
  // Fetch API
  const { data } = useSuspenseQuery(DetailMovie(Number(movieId)));

  return (
    <React.Fragment>
      <DetailHeader
        title={data.title}
        overview={data.overview}
        vote_count={data.vote_count}
        poster_path={data.poster_path}
        release_date={data.release_date}
        vote_average={data.vote_average}
        backdrop_path={data.backdrop_path}
        original_title={data.original_title}
      />
    </React.Fragment>
  );
}
