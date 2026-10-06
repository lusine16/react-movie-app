import { Link } from "react-router-dom";
import type { Movie } from "../../types/Movie";
import "./MovieCard.css";

type MovieCardProps = {
  movie: Movie;
  position?: number;
};

export function MovieCard({ movie, position }: MovieCardProps) {
  return (
    <Link
      className="movie-card"
      to={`/movie/${movie.id}`}
      aria-label={movie.title}
    >
      {position !== undefined && (
        <span className="movie-card__position">{position}</span>
      )}

      {movie.posterUrl ? (
        <img
          className="movie-card__image"
          src={movie.posterUrl}
          alt={movie.title}
        />
      ) : (
        <div className="movie-card__placeholder">{movie.title}</div>
      )}
    </Link>
  );
}
