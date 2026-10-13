import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { getFavorites } from "../../api/favorites";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { clearUser, selectUser } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Movie } from "../../types/Movie";
import { Loader } from "../../components/Loader/Loader";
import accountFavoriteImage from "../../assets/icons/account-favorite.svg";
import userImage from "../../assets/icons/user.svg";
import "./AccountPage.css";

type AccountTab = "favorites" | "settings";

export function AccountPage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<AccountTab>("favorites");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }

    getFavorites()
      .then((movies) => {
        setFavoriteMovies(movies);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  async function handleLogout() {
    await logout();

    dispatch(clearUser());
    navigate("/");
  }

  if (!user) {
    return <main>Пользователь не авторизован</main>;
  }

  if (activeTab === "favorites" && isLoading) {
    return (
      <main className="account-page">
        <Loader />
      </main>
    );
  }

  return (
    <main className="account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>

      <div className="account-page__tabs">
        <button
          className={
            activeTab === "favorites"
              ? "account-page__tab account-page__tab--active"
              : "account-page__tab"
          }
          type="button"
          onClick={() => setActiveTab("favorites")}
        >
          <img src={accountFavoriteImage} alt="" />
          <span>Избранные фильмы</span>
        </button>

        <button
          className={
            activeTab === "settings"
              ? "account-page__tab account-page__tab--active"
              : "account-page__tab"
          }
          type="button"
          onClick={() => setActiveTab("settings")}
        >
          <img src={userImage} alt="" />
          <span>Настройка аккаунта</span>
        </button>
      </div>

      {activeTab === "favorites" ? (
        <>
          {favoriteMovies.length > 0 ? (
            <div className="account-page__favorites">
              {favoriteMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p>В избранном пока нет фильмов</p>
          )}
        </>
      ) : (
        <section className="account-page__settings">
          <div>
            <span>Имя Фамилия</span>
            <strong>
              {user.name} {user.surname}
            </strong>
          </div>

          <div>
            <span>Электронная почта</span>
            <strong>{user.email}</strong>
          </div>

          <button
            className="account-page__logout"
            type="button"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </section>
      )}
    </main>
  );
}
