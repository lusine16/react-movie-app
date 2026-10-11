import type { Movie } from "../../types/Movie";
import "./MovieHero.css";
import favoriteIcon from "../../assets/icons/favorite.svg";
import favoriteFilledIcon from "../../assets/icons/favorite-filled.svg";
import refreshIcon from "../../assets/icons/refresh.svg";
import starIcon from "../../assets/icons/star.svg";

type MovieHeroProps = {
  movie: Movie;
  onRefresh?: () => void;
  onTrailer?: () => void;
  onDetails?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  isLoading?: boolean;
  showDetailsButton?: boolean;
};

export function MovieHero({
  movie,
  onRefresh,
  onTrailer,
  onDetails,
  onFavorite,
  isFavorite = false,
  isLoading = false,
  showDetailsButton = true,
}: MovieHeroProps) {
  return (
    <section className="movie-hero">
      <div className="movie-hero__content">
        <div className="movie-hero__meta">
          <span className="movie-hero__rating">
             <img
                src={starIcon}
                alt=""
                aria-hidden="true"
                className="movie-hero__star-icon"
              />
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
            aria-label={
              isFavorite ? "Удалить из избранного" : "Добавить в избранное"
            }
            onClick={onFavorite}
          >
            <img
              src={isFavorite ? favoriteFilledIcon : favoriteIcon}
              alt=""
              aria-hidden="true"
            />
          </button>

          {onRefresh && (
            <button
              className="movie-hero__icon-button"
              type="button"
              aria-label="Показать другой фильм"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <img
                src={refreshIcon}
                alt=""
                aria-hidden="true"
                className="movie-hero__refresh-icon"
              />
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
