import type { Movie, SortOption } from "../types";

export function filterAndSortMovies(
  movies: Movie[],
  minimumRating: number,
  sortBy: SortOption
): Movie[] {
  const filtered = movies.filter((movie) => movie.vote_average >= minimumRating);
  return [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.vote_average - a.vote_average;
    if (sortBy === "release") {
      return new Date(b.release_date || "1900-01-01").getTime() -
        new Date(a.release_date || "1900-01-01").getTime();
    }
    return 0;
  });
}

export function formatReleaseDate(date: string): string {
  if (!date) return "Release date unavailable";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Release date unavailable";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}