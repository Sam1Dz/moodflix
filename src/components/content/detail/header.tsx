'use client';

import React from 'react';
import { useExtractColors } from 'react-extract-colors';

/* MATERIAL UI */
import {
  Box,
  Container,
  Stack,
  getContrastRatio,
  useColorScheme
} from '@mui/material';
// Icons
import StarRateIcon from '@mui/icons-material/StarRate';

/* COMPONENTS */
import {
  StyledP,
  StyledH1,
  StyledH2,
  StyledImage,
  StyledSpan
} from '@/components/themes/styled';
import {
  textBodyLarge,
  textTitleLarge,
  textDisplaySmall,
  textTitleMedium
} from '@/components/themes/utilities';

/* TYPES */
import { MovieDetail } from '@/types';

interface DetailHeaderProps {
  title: MovieDetail['title'];
  overview: MovieDetail['overview'];
  vote_count: MovieDetail['vote_count'];
  poster_path: MovieDetail['poster_path'];
  release_date: MovieDetail['release_date'];
  vote_average: MovieDetail['vote_average'];
  backdrop_path: MovieDetail['backdrop_path'];
  original_title: MovieDetail['original_title'];
}

export default function DetailHeader({
  title,
  overview,
  vote_count,
  poster_path,
  release_date,
  vote_average,
  backdrop_path,
  original_title
}: DetailHeaderProps) {
  const { mode, systemMode } = useColorScheme();
  const colorScheme = systemMode || mode;

  const posterImage = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`;
  const { lighterColor, darkerColor } = useExtractColors(posterImage, {
    format: 'rgb'
  });
  const dynamicColor =
    lighterColor && darkerColor && poster_path
      ? (colorScheme === 'dark' ? darkerColor : lighterColor)
          .replace(/\D+/g, ' ')
          .trim()
      : 'var(--mui-palette-background-defaultChannel)';

  const getContrastText = () => {
    if (!(lighterColor && darkerColor)) {
      return 'var(--mui-palette-text-primary))';
    } else {
      return getContrastRatio(
        colorScheme === 'dark' ? darkerColor : lighterColor,
        '#fff'
      ) > 4.5
        ? '#e4e1e9'
        : '#1b1b21';
    }
  };
  const releaseDate = release_date ? release_date.split('-')[0] : null;
  const voteAverage = vote_average ? vote_average.toFixed(1) : null;
  const voteCount =
    vote_count >= 1000 ? (vote_count / 1000).toFixed(3) : vote_count.toString();

  const RenderHeroDetail = () => {
    const Segment = ({ header, value }: { header: string; value: string }) => {
      return (
        <Box component="div">
          <StyledH2
            sx={(theme) => ({
              display: 'block',
              fontWeight: 600,
              ...textTitleLarge,
              [theme.breakpoints.down('sm')]: {
                ...textTitleMedium
              }
            })}
          >
            {header}
          </StyledH2>
          <StyledP sx={textBodyLarge}>{value}</StyledP>
        </Box>
      );
    };

    return (
      <React.Fragment>
        <StyledH1
          sx={(theme) => ({
            display: 'block',
            fontWeight: 'bold',
            ...textDisplaySmall,
            [theme.breakpoints.down('sm')]: {
              textAlign: 'center',
              ...textTitleMedium
            }
          })}
        >
          {title}&nbsp;
          {releaseDate && (
            <StyledSpan sx={{ fontWeight: 'normal' }}>
              &#40;{releaseDate}&#41;
            </StyledSpan>
          )}
        </StyledH1>

        {original_title !== title && (
          <Segment header="Original Title" value={original_title} />
        )}
        <Segment header="Overview" value={overview} />

        {voteAverage && (
          <Stack
            component="div"
            spacing={0.5}
            direction="row"
            sx={(theme) => ({
              alignItems: 'center',
              justifyContent: 'center',
              [theme.breakpoints.up('sm')]: {
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }
            })}
          >
            <StarRateIcon
              sx={(theme) => ({
                fontSize: 22,
                [theme.breakpoints.down('sm')]: { fontSize: 16 }
              })}
            />
            <StyledP
              sx={(theme) => ({
                fontWeight: 'normal',
                ...textTitleLarge,
                [theme.breakpoints.down('sm')]: textBodyLarge
              })}
            >
              <StyledSpan sx={{ fontWeight: 600 }}>{voteAverage}</StyledSpan>
              &nbsp;/ 10 &#40;{voteCount}&#41;
            </StyledP>
          </Stack>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box component="header">
      <Box
        component="div"
        sx={(theme) => ({
          minHeight: 'calc(59* var(--mui-spacing))',
          backgroundSize: 'cover',
          backgroundColor: !backdrop_path ? `rgb(${dynamicColor})` : 'unset',
          backgroundImage: backdrop_path
            ? `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`
            : 'unset',
          [theme.breakpoints.down('sm')]: {
            minHeight: 'calc(27* var(--mui-spacing))'
          }
        })}
      >
        <Box
          component="div"
          sx={(theme) => ({
            height: '100%',
            backgroundImage: `linear-gradient(to right, rgba(${dynamicColor} / 1) calc((50vw - 170px) - 340px), rgba(${dynamicColor} / ${lighterColor && darkerColor ? '0.84' : '1'}) 50%, rgba(${dynamicColor} / ${lighterColor && darkerColor ? '0.84' : '1'}) 100%)`,
            [theme.breakpoints.down('sm')]: {
              backgroundImage: `linear-gradient(to right, rgba(${dynamicColor} / 1) 20%, rgba(${dynamicColor} / ${lighterColor && darkerColor ? '0' : '1'}) 50%)`
            }
          })}
        >
          <Container maxWidth="xl" sx={{ py: 2 }}>
            <Box
              component="div"
              sx={(theme) => ({
                gap: 3,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                [theme.breakpoints.down('sm')]: {
                  justifyContent: backdrop_path ? 'flex-start' : 'center'
                }
              })}
            >
              <StyledImage
                unoptimized
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`
                    : '/images/no-movie.png'
                }
                alt={title}
                height={900}
                width={600}
                sx={(theme) => ({
                  height: 'calc(55* var(--mui-spacing))',
                  width: 293,
                  [theme.breakpoints.down('sm')]: {
                    height: 'calc(23* var(--mui-spacing))',
                    width: 123
                  }
                })}
              />

              <Box
                component="section"
                sx={(theme) => ({
                  py: 2,
                  gap: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  color: getContrastText(),
                  [theme.breakpoints.down('sm')]: { display: 'none' }
                })}
              >
                {RenderHeroDetail()}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Box
        component="section"
        sx={(theme) => ({
          color: getContrastText(),
          backgroundColor: `rgb(${dynamicColor})`,
          [theme.breakpoints.up('sm')]: { display: 'none' }
        })}
      >
        <Container
          maxWidth="xl"
          sx={{ gap: 3, py: 2, display: 'flex', flexDirection: 'column' }}
        >
          {RenderHeroDetail()}
        </Container>
      </Box>
    </Box>
  );
}
