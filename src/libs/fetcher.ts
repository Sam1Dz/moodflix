import axios from 'axios';
import { queryOptions } from '@tanstack/react-query';

/* TYPES */
import type { GetMovies, MovieDetail } from '@/types';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default async function Fetcher<T>(url: string) {
  return axios.get<T>(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
}

export const MoviesByPopularity = (page: number) =>
  queryOptions({
    queryKey: ['moviesByPopularity', page],
    queryFn: async () => {
      const response = await Fetcher<GetMovies>(
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`
      );
      return response.data;
    }
  });
export const SearchMovies = (query: string, page: number) =>
  queryOptions({
    queryKey: ['searchMovies', query],
    queryFn: async () => {
      const response = await Fetcher<GetMovies>(
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
      );
      return response.data;
    }
  });
export const DetailMovie = (movieId: number) =>
  queryOptions({
    queryKey: ['moviesByPopularity', movieId],
    queryFn: async () => {
      const response = await Fetcher<MovieDetail>(
        `${API_BASE_URL}/movie/${movieId}`
      );
      return response.data;
    }
  });
