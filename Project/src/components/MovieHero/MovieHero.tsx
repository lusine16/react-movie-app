import type { Movie } from "../../types/Movie";
import "./MovieHero.css";

type MovieHeroProps = {
  movie: Movie;
  onRefresh?: () => void;
  onTrailer?: () => void;
  onDetails?: () => void
  isLoading?: boolean;
  showDetailsButton?: boolean;
};

export function MovieHero({
  movie,
  onRefresh,
  onTrailer,
  onDetails,
  isLoading = false,
  showDetailsButton = true,
}: MovieHeroProps) {
  return (
    <section className="movie-hero">
      <div className="movie-hero__content">
        <div className="movie-hero__meta">
          <span className="movie-hero__rating">
            {movie.tmdbRating.toFixed(1)}
          </span>

          <span>{movie.releaseYear}</span>

          <span>{movie.genres.join(", ")}</span>

          <span>{movie.runtime} мин</span>
        </div>

        <h1 className="movie-hero__title">{movie.title}</h1>

        <p className="movie-hero__description">{movie.plot}</p>

        <div className="movie-hero__actions">
          <button
            className="movie-hero__button movie-hero__button--primary"
            type="button"
            onClick={onTrailer}
          >
            Трейлер
          </button>

          {showDetailsButton && (
            <button
              className="movie-hero__button movie-hero__button--secondary"
              type="button"
              onClick={onDetails}
            >
              О фильме
            </button>
          )}

          <button
            className="movie-hero__icon-button"
            type="button"
            aria-label="Добавить в избранное"
          >
            ♡
          </button>

          {onRefresh && (
            <button
              className="movie-hero__icon-button"
              type="button"
              aria-label="Показать другой фильм"
              onClick={onRefresh}
              disabled={isLoading}
            >
              ↻
            </button>
          )}
        </div>
      </div>

      {movie.backdropUrl ? (
        <img
          className="movie-hero__image"
          src={movie.backdropUrl}
          alt={movie.title}
        />
      ) : (
        <div className="movie-hero__image movie-hero__image--placeholder" />
      )}
    </section>
  );
}
