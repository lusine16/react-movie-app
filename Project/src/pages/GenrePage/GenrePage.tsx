import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre } from "../../api/movies";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { genreTitles } from "../../data/genreTitles";
import type { Movie } from "../../types/Movie";
import "./GenrePage.css";

export function GenrePage() {
  const { genre } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!genre) {
      return;
    }

    getMoviesByGenre(genre, page).then((genreMovies) => {
      setMovies((currentMovies) =>
        page === 1 ? genreMovies : [...currentMovies, ...genreMovies],
      );
      setHasMore(genreMovies.length === 10);
    });
  }, [genre, page]);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((currentPage) => currentPage + 1);
      }
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  if (!genre) {
    return <main>Жанр не найден</main>;
  }

  return (
    <main className="genre-page">
      <h1 className="genre-page__title">{genreTitles[genre] ?? genre}</h1>

      <div className="genre-page__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="genre-page__load-more"
          aria-hidden="true"
        />
      )}
    </main>
  );
}
