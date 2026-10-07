import "./SearchModal.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../../api/movies";
import type { Movie } from "../../types/Movie";
import "./SearchModal.css";

type SearchModalProps = {
  onClose: () => void;
};

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    searchMovies(query).then((results) => {
      setMovies(results);
    });
  }, [query]);

  return (
    <div className="search-modal">
      <div className="search-modal__content">
        <button
          className="search-modal__close"
          type="button"
          aria-label="Закрыть поиск"
          onClick={onClose}
        >
          ×
        </button>

        <input
          className="search-modal__input"
          type="search"
          placeholder="Поиск"
          value={query}
          onChange={(event) => {
            const value = event.target.value;

            setQuery(value);

            if (!value.trim()) {
              setMovies([]);
            }
          }}
        />
        {movies.length > 0 && (
          <div className="search-modal__results">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                className="search-modal__result"
                to={`/movie/${movie.id}`}
                onClick={onClose}
              >
                {movie.posterUrl && (
                  <img src={movie.posterUrl} alt={movie.title} />
                )}

                <div>
                  <strong>{movie.title}</strong>
                  <span>
                    {movie.releaseYear} · {movie.genres.join(", ")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
