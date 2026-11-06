import type { MovieSearchResponse } from "../types";

const API_BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(
  query: string,
  page = 1,
  signal?: AbortSignal
): Promise<MovieSearchResponse> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error("TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file.");
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    query,
    page: String(page),
    include_adult: "false"
  });

  const response = await fetch(`${API_BASE_URL}/search/movie?${params}`, { signal });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("TMDB rejected the API key. Check your VITE_TMDB_API_KEY value.");
    }
    throw new Error(`Movie search failed (${response.status}). Please try again.`);
  }

  return response.json() as Promise<MovieSearchResponse>;
}

export function getPosterUrl(path: string | null): string | null {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
}