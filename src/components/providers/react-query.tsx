'use client';

import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

/* LIBRARIES */
import { getQueryClient } from '@/libs/get-query-client';

/* TYPES */
import type { ComponentWithChildrenReq } from '@/types';

export default function ReactQueryProvider({
  children
}: ComponentWithChildrenReq) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
