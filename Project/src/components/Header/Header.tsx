import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/authSlice";
import { AuthModal } from "../AuthModal/AuthModal";
import { searchMovies } from "../../api/movies";
import type { Movie } from "../../types/Movie";
import logoImage from "../../assets/icons/logo.svg";
import searchImage from "../../assets/icons/search.svg";
import genresImage from "../../assets/icons/genres.svg";
import accountImage from "../../assets/icons/account.svg";

export function Header() {
  const user = useAppSelector(selectUser);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    let cancelled = false;

    searchMovies(query)
      .then((results) => {
        if (!cancelled) {
          setMovies(results);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMovies([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <img src={logoImage} alt="Маруся" className="header__logo-image" />
      </NavLink>

      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
          }
        >
          Главная
        </NavLink>

        <NavLink
          to="/genres"
          className={({ isActive }) =>
            `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
          }
        >
          Жанры
        </NavLink>
      </nav>

      <div className="header__mobile-actions">
        <NavLink
          to="/genres"
          className="header__icon-button"
          aria-label="Жанры"
        >
          <img src={genresImage} alt="" />
        </NavLink>
      </div>

      <div className="header__search-container">
        <div className="header__search">
          <img src={searchImage} alt="" className="header__search-icon" />
          <input
            className="header__search-input"
            type="search"
            placeholder="Поиск"
            aria-label="Поиск фильмов"
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              setMovies([]);
            }}
          />
        </div>

        {movies.length > 0 && (
          <div className="header__search-results">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                className="header__search-result"
                to={`/movie/${movie.id}`}
                onClick={() => {
                  setQuery("");
                  setMovies([]);
                }}
              >
                {movie.posterUrl && <img src={movie.posterUrl} alt="" />}
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

      {user ? (
        <NavLink to="/account" className="header__account">
          <span className="header__account-text">{user.surname}</span>
          <img src={accountImage} alt="" className="header__account-icon" />
        </NavLink>
      ) : (
        <button
          className="header__account"
          type="button"
          onClick={() => setIsAuthOpen(true)}
        >
          <span className="header__account-text">Войти</span>
          <img src={accountImage} alt="" className="header__account-icon" />
        </button>
      )}

      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </header>
  );
}
