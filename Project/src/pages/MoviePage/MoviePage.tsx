import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { MovieHero } from "../../components/MovieHero/MovieHero";
import type { Movie } from "../../types/Movie";
import { formatMoney } from "../../utils/formatMoney";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import "./MoviePage.css";

export function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    getMovieById(Number(movieId)).then((movieData) => {
      setMovie(movieData);
    });
  }, [movieId]);

  if (!movie) {
    return <main>Загрузка...</main>;
  }

  return (
    <main className="movie-page">
      <MovieHero
        movie={movie}
        showDetailsButton={false}
        onTrailer={() => setIsTrailerOpen(true)}
      />

      <section className="movie-page__about">
        <h2 className="movie-page__about-title">О фильме</h2>

        <dl className="movie-page__details">
          <div>
            <dt>Язык оригинала</dt>
            <dd>{movie.language}</dd>
          </div>

          <div>
            <dt>Бюджет</dt>
            <dd>{formatMoney(movie.budget)}</dd>
          </div>

          <div>
            <dt>Выручка</dt>
            <dd>{formatMoney(movie.revenue)}</dd>
          </div>

          <div>
            <dt>Режиссёр</dt>
            <dd>{movie.director ?? "Нет данных"}</dd>
          </div>

          <div>
            <dt>Продакшен</dt>
            <dd>{movie.production ?? "Нет данных"}</dd>
          </div>

          <div>
            <dt>Награды</dt>
            <dd>{movie.awardsSummary ?? "Нет данных"}</dd>
          </div>
        </dl>
      </section>
      {isTrailerOpen && (
        <TrailerModal
          videoId={movie.trailerYouTubeId}
          title={movie.title}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </main>
  );
}
