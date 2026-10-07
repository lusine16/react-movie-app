import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/authSlice";
import { useState } from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import { SearchModal } from "../SearchModal/SearchModal";

export function Header() {
  const user = useAppSelector(selectUser);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <span className="header__logo-icon" />
        <span className="header__logo-text">маруся</span>
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
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
          </svg>
        </NavLink>
      </div>

      <button
        className="header__search"
        type="button"
        aria-label="Поиск"
        onClick={() => setIsSearchOpen(true)}
      >
        <svg
          className="header__search-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 4 4" />
        </svg>

        <span className="header__search-text">Поиск</span>
      </button>

      {user ? (
        <NavLink to="/account" className="header__account">
          <span className="header__account-text">{user.surname}</span>

          <svg
            className="header__account-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
        </NavLink>
      ) : (
        <button
          className="header__account"
          type="button"
          onClick={() => setIsAuthOpen(true)}
        >
          <span className="header__account-text">Войти</span>

          <svg
            className="header__account-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
        </button>
      )}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
}
