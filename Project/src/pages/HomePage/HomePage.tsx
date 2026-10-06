import { useEffect, useState } from "react";
import { getRandomMovie } from "../../api/movies";
import { MovieHero } from "../../components/MovieHero/MovieHero";
import { TopMovies } from "../../components/TopMovies/TopMovies";
import type { Movie } from "../../types/Movie";
import { useNavigate } from "react-router-dom";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";

export function HomePage() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

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

  if (!movie) {
    return <main>Загрузка...</main>;
  }

  return (
    <main>
      <MovieHero
        movie={movie}
        onRefresh={handleRefresh}
        onTrailer={() => setIsTrailerOpen(true)}
        onDetails={() => navigate(`/movie/${movie.id}`)}
        isLoading={isLoading}
      />

      <TopMovies />
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
