import React from 'react';

/* MATERIAL UI */
import { Container } from '@mui/material';

/* COMPONENTS */
import UIAlert from '@/components/ui/alert';
// Content
import DetailContent from '@/components/content/detail';

/* HELPERS */
import TitleToLink from '@/helpers/title-to-link';

/* LIBRARIES */
import { GetMovieDetail } from '@/libs/fetcher';

/* TYPES */
import type { Metadata } from 'next';
import type { MovieDetail } from '@/types';

interface DetailPageProps {
  params: Promise<{ detail: string[] }>;
}

export async function generateMetadata({
  params
}: DetailPageProps): Promise<Metadata> {
  const movieId = (await params).detail[0] || '';

  const response = await GetMovieDetail(movieId);
  if (!response.ok) return {};

  const movie = await response.json();
  const webUrl = `/detail/${movie.id}/${TitleToLink(movie.title)}`;
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return {
    title: `Movie ${movie.title} | Moodflix`,
    description: movie.overview,
    openGraph: {
      title: `Movie ${movie.title} | Moodflix`,
      description: movie.overview,
      images: {
        url: imageUrl,
        width: 600,
        height: 900
      },
      url: webUrl,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Movie ${movie.title} | Moodflix`,
      description: movie.overview,
      images: imageUrl
    },
    alternates: {
      canonical: webUrl
    }
  };
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
