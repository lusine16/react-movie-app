import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/authSlice";
import { useState } from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import { SearchModal } from "../SearchModal/SearchModal";
import logoImage from "../../assets/icons/logo.svg";
import searchImage from "../../assets/icons/search.svg";
import genresImage from "../../assets/icons/genres.svg";
import accountImage from "../../assets/icons/account.svg";

export function Header() {
  const user = useAppSelector(selectUser);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

      <button
        className="header__search"
        type="button"
        aria-label="Поиск"
        onClick={() => setIsSearchOpen(true)}
      >
        <img src={searchImage} alt="" className="header__search-icon" />

        <span className="header__search-text">Поиск</span>
      </button>

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
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
}
