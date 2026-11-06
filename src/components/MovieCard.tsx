import type { Movie } from "../types";
import { formatReleaseDate } from "../utils/movieUtils";
import { getPosterUrl } from "../api/tmdb";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const poster = getPosterUrl(movie.poster_path);

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {poster ? (
          <img className="movie-poster" src={poster} alt={`${movie.title} poster`} />
        ) : (
          <div className="poster-placeholder" role="img" aria-label="Poster unavailable">🎬</div>
        )}
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p className="movie-meta"><span>RELEASE DATE</span>{formatReleaseDate(movie.release_date)}</p>
        <p className="movie-meta"><span>RATING</span><strong className="rating">★ {movie.vote_average.toFixed(1)} / 10</strong></p>
        <p className="movie-overview">
          {movie.overview || "No description is available for this movie."}
        </p>
      </div>
    </article>
  );
}