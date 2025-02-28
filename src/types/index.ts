import React from 'react';

export type ComponentWithChildrenReq<T = object> = T &
  Readonly<{
    children: React.ReactNode;
  }>;
export type ComponentWithChildren<T = object> = T &
  Readonly<{
    children?: React.ReactNode;
  }>;
