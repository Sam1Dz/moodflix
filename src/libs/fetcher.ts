/* TYPES */
import type { FetchResponses, GetMovies, MovieDetail } from '@/types';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default async function Fetcher<T>(
  url: string,
  config?: RequestInit
): Promise<FetchResponses<T>> {
  return await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    ...config,
    next: {
      ...config?.next,
      revalidate: config?.next?.revalidate || 60
    }
  });
}

// API Calls
export const GetMoviesByPopularity = async (page: number) => {
  return await Fetcher<GetMovies>(
    `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`
  );
};
export const SearchMovies = async (query: string, page: number) => {
  return await Fetcher<GetMovies>(
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );
};
export const GetMovieDetail = async (movieId: string) => {
  return await Fetcher<MovieDetail>(`${API_BASE_URL}/movie/${movieId}`);
};
