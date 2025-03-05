'use client';

import React from 'react';

/* MATERIAL UI */
import { Box, Container, Toolbar } from '@mui/material';

/* COMPONENTS */
import { textHeadlineSmall } from '@/components/themes/utilities';
import {
  StyledImage,
  StyledLink,
  StyledSpan
} from '@/components/themes/styled';

/* TYPES */
import type { ComponentWithChildrenReq } from '@/types';

export default function AppHeader({ children }: ComponentWithChildrenReq) {
  return (
    <React.Fragment>
      <Box component="header">
        <Toolbar sx={{ padding: 'unset !important' }}>
          <Container component="nav" maxWidth="xl">
            <StyledLink
              href="/"
              sx={{
                gap: 1,
                cursor: 'pointer',
                alignItems: 'center',
                display: 'inline-flex'
              }}
              aria-label="Go to Moodflix homepage"
            >
              <StyledImage
                priority
                src="/images/logo.png"
                alt="Moodflix Logo"
                width={91}
                height={66}
                sx={(theme) => ({
                  width: 55,
                  height: 40,
                  [theme.breakpoints.down('sm')]: {
                    width: 44,
                    height: 32
                  }
                })}
              />
              <StyledSpan
                sx={{
                  fontWeight: 'bold',
                  ...textHeadlineSmall
                }}
              >
                Moodflix
              </StyledSpan>
            </StyledLink>
          </Container>
        </Toolbar>
      </Box>

      {children}
    </React.Fragment>
  );
}
