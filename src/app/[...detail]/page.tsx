/* REACT QUERY */
import { getQueryClient } from '@/libs/get-query-client';

/* MATERIAL UI */
import { Box, Container, Toolbar } from '@mui/material';

/* COMPONENTS */
import UINavLogo from '@/components/ui/nav-logo';
import DetailContent from '@/components/content/detail';

/* LIBRARIES */
import { DetailMovie } from '@/libs/fetcher';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface DetailPageProps {
  params: Promise<{ detail: string[] }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const movieId = (await params).detail[0] || '';

  /* Fetch API */
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(DetailMovie(Number(movieId)));

  return (
    <Box component="div">
      <Box component="header">
        <Toolbar sx={{ padding: 'unset !important' }}>
          <Container component="nav" maxWidth="xl">
            <UINavLogo />
          </Container>
        </Toolbar>
      </Box>

      <Box component="main">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DetailContent movieId={movieId} />
        </HydrationBoundary>
      </Box>
    </Box>
  );
}
