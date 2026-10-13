import { useEffect, useState } from "react";
import { getRandomMovie } from "../../api/movies";
import { MovieHero } from "../../components/MovieHero/MovieHero";
import { TopMovies } from "../../components/TopMovies/TopMovies";
import type { Movie } from "../../types/Movie";
import { useNavigate } from "react-router-dom";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import { addFavorite, removeFavorite } from "../../api/favorites";
import { getProfile } from "../../api/auth";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, setUser } from "../../store/authSlice";
import { Loader } from "../../components/Loader/Loader";

export function HomePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    getRandomMovie().then((randomMovie) => {
      setMovie(randomMovie);
      setIsLoading(false);
    });
  }, []);

  async function handleRefresh() {
    setIsLoading(true);

    const randomMovie = await getRandomMovie();

    setMovie(randomMovie);
    setIsLoading(false);
  }

  async function handleFavorite() {
    if (!movie) {
      return;
    }

    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    const isFavorite = user.favorites.includes(String(movie.id));

    if (isFavorite) {
      await removeFavorite(movie.id);
    } else {
      await addFavorite(movie.id);
    }

    const updatedUser = await getProfile();
    dispatch(setUser(updatedUser));
  }

 if (isLoading && !movie) {
  return (
    <main>
      <Loader />
    </main>
  );
}

if (!movie) {
  return null;
}

  const isFavorite = user?.favorites.includes(String(movie.id)) ?? false;

  return (
    <main>
      <MovieHero
        movie={movie}
        onRefresh={handleRefresh}
        onTrailer={() => setIsTrailerOpen(true)}
        onDetails={() => navigate(`/movie/${movie.id}`)}
        isLoading={isLoading}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
      />

      <TopMovies />
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
