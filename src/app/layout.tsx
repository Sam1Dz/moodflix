import React from 'react';
import { DM_Sans, Bebas_Neue } from 'next/font/google';

/* COMPONENTS */
import ReactQueryProvider from '@/components/providers/react-query';
import MuiMaterialProvider from '@/components/providers/mui-material';

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
  description: "Find Movies You'll Enjoy Without the Hassle"
};

export default function RootLayout({ children }: ComponentWithChildrenReq) {
  return (
    <html lang="en">
      <body className={`${FontDMSans.variable} ${FontBebasNeue.variable}`}>
        <ReactQueryProvider>
          <MuiMaterialProvider>{children}</MuiMaterialProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
