import React from 'react';

export type ComponentWithChildrenReq<T = object> = T &
  Readonly<{
    children: React.ReactNode;
  }>;
export type ComponentWithChildren<T = object> = T &
  Readonly<{
    children?: React.ReactNode;
  }>;

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}
export interface BaseMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/* RESPONSE API TYPE */
export interface GetMovies extends BaseResponse {
  results: BaseMovie[];
}
