import React from 'react';

/* MATERIAL UI */
import { Container } from '@mui/material';

/* COMPONENTS */
import UIAlert from '@/components/ui/alert';
// Content
import DetailContent from '@/components/content/detail';

/* LIBRARIES */
import { GetMovieDetail } from '@/libs/fetcher';

/* TYPES */
import type { MovieDetail } from '@/types';

interface DetailPageProps {
  params: Promise<{ detail: string[] }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const movieId = (await params).detail[0] || '';

  let data: MovieDetail | null = null;
  let errorInfo = {
    isError: false,
    message: ''
  };

  /* Fetch API */
  try {
    const response = await GetMovieDetail(movieId);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Movie not found!');
      } else {
        throw new Error('Failed to fetch movies!');
      }
    }

    data = await response.json();
  } catch (error) {
    console.error(error);

    errorInfo = {
      isError: true,
      message: (error as Error).message
    };
  }

  if (!errorInfo.isError && data) {
    return <DetailContent data={data} />;
  } else {
    return (
      <Container maxWidth="xl">
        <UIAlert message={errorInfo.message} severity="error" sx={{ mt: 2 }} />
      </Container>
    );
  }
}
