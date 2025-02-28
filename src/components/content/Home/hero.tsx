'use client';

import React from 'react';

/* COMPONENTS */
import { StyledH1, StyledImage, StyledSpan } from '@/components/theme';

export default function HomeHero() {
  return (
    <React.Fragment>
      <StyledImage
        priority
        src="/images/logo.png"
        alt="Logo"
        width={91}
        height={66}
        sx={(theme) => ({
          width: 91,
          height: 66,
          [theme.breakpoints.down('sm')]: {
            width: 68,
            height: 50
          }
        })}
      />
      <StyledImage
        priority
        src="/images/hero.png"
        alt="Logo"
        width={473}
        height={440}
        sx={(theme) => ({
          width: 473,
          height: 440,
          [theme.breakpoints.down('sm')]: {
            width: 307,
            height: 286
          }
        })}
      />
      <StyledH1
        sx={(theme) => ({
          maxWidth: 'md',
          fontSize: '3.5em',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '60px',
          letterSpacing: '-1%',
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.75em',
            lineHeight: '30px'
          }
        })}
      >
        Find&nbsp;
        <StyledSpan
          sx={{
            color: 'transparent',
            backgroundClip: 'text',
            backgroundImage:
              'linear-gradient(to right, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))'
          }}
        >
          Movies
        </StyledSpan>
        &nbsp;You&apos;ll Enjoy Without the Hassle
      </StyledH1>
    </React.Fragment>
  );
}
