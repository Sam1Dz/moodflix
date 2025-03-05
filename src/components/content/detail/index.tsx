'use client';

/* MATERIAL UI */
import { Box } from '@mui/material';

/* COMPONENTS */
import DetailHero from './hero';

/* TYPES */
import { MovieDetail } from '@/types';

interface DetailContentProps {
  data: MovieDetail;
}

export default function DetailContent({ data }: DetailContentProps) {
  return (
    <Box component="main" aria-label="Movie detail content">
      <DetailHero
        title={data.title}
        overview={data.overview}
        vote_count={data.vote_count}
        poster_path={data.poster_path}
        release_date={data.release_date}
        vote_average={data.vote_average}
        backdrop_path={data.backdrop_path}
        original_title={data.original_title}
      />
    </Box>
  );
}
