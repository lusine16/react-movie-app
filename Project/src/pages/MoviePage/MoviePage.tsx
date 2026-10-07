import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { MovieHero } from "../../components/MovieHero/MovieHero";
import type { Movie } from "../../types/Movie";
import { formatMoney } from "../../utils/formatMoney";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import { addFavorite, removeFavorite } from "../../api/favorites";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { selectUser, setUser } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProfile } from "../../api/auth";
import "./MoviePage.css";

export function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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

  const currentMovieId = movie.id;

  const isFavorite = user?.favorites.includes(String(currentMovieId)) ?? false;

  async function handleFavorite() {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    if (isFavorite) {
      await removeFavorite(currentMovieId);
    } else {
      await addFavorite(currentMovieId);
    }

    const updatedUser = await getProfile();

    dispatch(setUser(updatedUser));
  }

  return (
    <main className="movie-page">
      <MovieHero
        movie={movie}
        showDetailsButton={false}
        onTrailer={() => setIsTrailerOpen(true)}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
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
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </main>
  );
}
