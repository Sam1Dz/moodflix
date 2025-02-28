'use client';

import NextImage from 'next/image';

/* MATERIAL UI */
import { styled } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const StyledImage = styled(NextImage)({});
export const StyledH1 = styled('h1')({});
export const StyledSpan = styled('span')({});
const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#fbf8ff',
          paper: '#f5f2fa'
        },
        primary: {
          main: '#565992',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#78536a',
          contrastText: '#ffffff'
        },
        text: {
          primary: '#1b1b21',
          secondary: '#46464f',
          disabled: '#777680'
        },
        error: {
          main: '#ba1a1a',
          contrastText: '#ffffff'
        }
      }
    },
    dark: {
      palette: {
        background: {
          default: '#131318',
          paper: '#1b1b21'
        },
        primary: {
          main: '#bfc2ff',
          contrastText: '#272b60'
        },
        secondary: {
          main: '#e8b9d4',
          contrastText: '#46263b'
        },
        text: {
          primary: '#e4e1e9',
          secondary: '#c7c5d0',
          disabled: '#918f9a'
        },
        error: {
          main: '#ffb4ab',
          contrastText: '#690005'
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },
  typography: {
    fontFamily: 'var(--font-dm-sans)'
  }
});

export default theme;
