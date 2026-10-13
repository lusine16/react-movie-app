import { useEffect, useState } from "react";
import { getGenres } from "../../api/movies";
import { GenreCard } from "../../components/GenreCard/GenreCard";
import type { Genre } from "../../types/Genre";
import { createGenres } from "../../utils/genres";
import { Loader } from "../../components/Loader/Loader";
import "./GenresPage.css";

export function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGenres()
      .then((genreNames) => {
        setGenres(createGenres(genreNames));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }
  
  return (
    <main>
      <h1 className="genres-title">Жанры фильмов</h1>

      <div className="genres-grid">
        {genres.map((genre) => (
          <GenreCard key={genre.name} genre={genre} />
        ))}
      </div>
    </main>
  );
}
