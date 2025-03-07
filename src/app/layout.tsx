import React from 'react';
import { DM_Sans, Bebas_Neue } from 'next/font/google';

/* MATERIAL UI */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

/* COMPONENTS */
import theme from '@/components/themes';
import TopLoader from '@/components/ui/top-loader';

/* TYPES */
import type { Metadata } from 'next';
import type { ComponentWithChildrenReq } from '@/types';

import './globals.css';

const FontDMSans = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-sans'
});
const FontBebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-bebas-neue'
});

export const metadata: Metadata = {
  title: 'Moodflix',
  description: "Find Movies You'll Enjoy Without the Hassle",
  openGraph: {
    title: 'Moodflix',
    description: "Find Movies You'll Enjoy Without the Hassle",
    images: {
      url: '/images/logo.png',
      width: 91,
      height: 66
    },
    type: 'website',
    siteName: 'Moodflix'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moodflix',
    description: "Find Movies You'll Enjoy Without the Hassle",
    images: '/images/logo.png'
  },
  robots: {
    index: true,
    follow: true
  },
  other: {
    'theme-color': '#565992'
  }
};

export default function RootLayout({ children }: ComponentWithChildrenReq) {
  return (
    <html lang="en">
      <body className={`${FontDMSans.variable} ${FontBebasNeue.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme} defaultMode="system">
            <TopLoader />
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
