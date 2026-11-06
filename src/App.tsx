import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";
import { searchMovies } from "./api/tmdb";
import { filterAndSortMovies } from "./utils/movieUtils";
import type { Movie, SortOption } from "./types";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [minimumRating, setMinimumRating] = useState(0);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");

    searchMovies(query, page, controller.signal)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setMovies([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query, page]);

  const visibleMovies = useMemo(
    () => filterAndSortMovies(movies, minimumRating, sortBy),
    [movies, minimumRating, sortBy]
  );

  function handleSearch(newQuery: string) {
    setPage(1);
    setQuery(newQuery);
    setSortBy("relevance");
    setMinimumRating(0);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="CineSearch home"><span>🎬</span> CINESEARCH</a>
        <span className="topbar-tag">FIND YOUR NEXT FAVOURITE</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR MOVIE DISCOVERY HUB</p>
        <h1>Find your next <span>movie night.</span></h1>
        <p className="hero-copy">Search thousands of movies and explore the stories behind them.</p>
        <SearchBar onSearch={handleSearch} loading={loading} />
      </section>

      <section className="results-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>{query ? `Results for “${query}”` : "Explore movies"}</h2>
          </div>
          {query && <span className="result-count">{movies.length} on this page</span>}
        </div>

        {query && movies.length > 0 && (
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            minimumRating={minimumRating}
            onRatingChange={setMinimumRating}
          />
        )}

        {loading && <p className="status-message">Finding movies for you...</p>}
        {error && <p className="error-message" role="alert">{error}</p>}
        {!loading && !error && query && visibleMovies.length === 0 && (
          <div className="empty-state"><span>🍿</span><h3>No movies found</h3><p>Try another title or lower the minimum rating.</p></div>
        )}
        {!query && (
          <div className="empty-state"><span>🔎</span><h3>What would you like to watch?</h3><p>Enter a movie title above to get started.</p></div>
        )}

        <div className="movie-list">
          {visibleMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {!loading && movies.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </section>

      <footer className="footer">
        <p>Movie information provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a>.</p>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </main>
  );
}