import "./AuthModal.css";
import type { FormEvent } from "react";
import { useState } from "react";
import { getProfile, login, register } from "../../api/auth";
import { setUser } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";
import "./AuthModal.css";

type AuthModalProps = {
  onClose: () => void;
};

export function AuthModal({ onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const fields = [!email ? "email" : "", !password ? "password" : ""];

    if (mode === "register") {
      if (!name) {
        fields.push("name");
      }

      if (!surname) {
        fields.push("surname");
      }
    }

    const invalid = fields.filter(Boolean);

    setInvalidFields(invalid);

    if (invalid.length > 0) {
      return;
    }

    try {
      if (mode === "register") {
        await register({
          email,
          password,
          name,
          surname,
        });

        await login({
          email,
          password,
        });
      } else {
        await login({
          email,
          password,
        });
      }

      const user = await getProfile();

      dispatch(setUser(user));
      onClose();
    } catch {
      setError(
        mode === "login"
          ? "Неверная почта или пароль"
          : "Не удалось зарегистрироваться",
      );
    }
  }

  return (
    <div className="auth-modal">
      <div className="auth-modal__content">
        <button
          className="auth-modal__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
          ×
        </button>

        <div className="auth-modal__logo">
          <span className="auth-modal__logo-icon" />
          <span>маруся</span>
        </div>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <input
                className={
                  invalidFields.includes('name') && !name
                    ? "auth-modal__input auth-modal__input--error"
                    : "auth-modal__input"
                }
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <input
                className={
                  invalidFields.includes('surname') && !surname
                    ? "auth-modal__input auth-modal__input--error"
                    : "auth-modal__input"
                }
                type="text"
                placeholder="Фамилия"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </>
          )}
          <input
            className={
              invalidFields.includes('email') && !email
                ? "auth-modal__input auth-modal__input--error"
                : "auth-modal__input"
            }
            type="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className={
             invalidFields.includes('password') && !password
                ? "auth-modal__input auth-modal__input--error"
                : "auth-modal__input"
            }
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="auth-modal__error">{error}</p>}

          <button type="submit">
            {mode === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>

        <button
          className="auth-modal__switch"
          type="button"
          onClick={() => {
            setMode((currentMode) =>
              currentMode === "login" ? "register" : "login",
            );
            setError("");
          }}
        >
          {mode === "login" ? "Регистрация" : "У меня есть пароль"}
        </button>
      </div>
    </div>
  );
}
