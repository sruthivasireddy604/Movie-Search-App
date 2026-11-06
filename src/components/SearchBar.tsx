import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("Jurassic Park");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-label" htmlFor="movie-query">MOVIE NAME</label>
      <input
        id="movie-query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a movie..."
        aria-label="Movie name"
      />
      <button type="submit" disabled={loading || !query.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}