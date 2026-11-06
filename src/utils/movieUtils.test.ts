import { describe, expect, it } from "vitest";
import { filterAndSortMovies, formatReleaseDate } from "./movieUtils";
import type { Movie } from "../types";

const movies: Movie[] = [
  { id: 1, title: "Older Hit", overview: "", poster_path: null, release_date: "2000-01-01", vote_average: 8.5 },
  { id: 2, title: "Newer Film", overview: "", poster_path: null, release_date: "2022-01-01", vote_average: 7.2 },
  { id: 3, title: "Low Score", overview: "", poster_path: null, release_date: "2024-01-01", vote_average: 4.1 }
];

describe("filterAndSortMovies", () => {
  it("filters movies by minimum rating", () => {
    expect(filterAndSortMovies(movies, 7, "relevance")).toHaveLength(2);
  });

  it("sorts by rating from highest to lowest", () => {
    expect(filterAndSortMovies(movies, 0, "rating").map((movie) => movie.id)).toEqual([1, 2, 3]);
  });

  it("sorts by newest release date first", () => {
    expect(filterAndSortMovies(movies, 0, "release").map((movie) => movie.id)).toEqual([3, 2, 1]);
  });

  it("does not mutate the original array", () => {
    const original = [...movies];
    filterAndSortMovies(movies, 0, "rating");
    expect(movies).toEqual(original);
  });
});

describe("formatReleaseDate", () => {
  it("returns a readable date", () => {
    expect(formatReleaseDate("2020-05-12")).toBe("May 12, 2020");
  });

  it("handles missing dates", () => {
    expect(formatReleaseDate("")).toBe("Release date unavailable");
  });
});