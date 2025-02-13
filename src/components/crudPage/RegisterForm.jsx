import { Suspense, useState } from "react";
import FormInput from "../elements/FormInput";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // console.log("Username:", username);
    // console.log("Password:", password);

    if (!password || !username) {
      setError("Логин и пароль не могут быть пустыми");
      return;
    }

    try {
      const response = await fetch(
        "http://89.22.225.116:8080/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Ответ:", data);
        setSucsess("Регистрация успешна. Теперь войдите в систему");
      } else {
        const errorData = await response.json();
        console.error("Ошибка:", errorData);
        setError("Такой логин уже занят");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("Ошибка сети");
      setError(error);
    }
  };

  return (
    <section className="form-container">
      <h2 className="logo">Task Tracker</h2>
      <div className="left-form-wrapper">
        <form
          className="left-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <h2 className="title">Регистрация</h2>
          <FormInput
            id="username"
            placeholder="Логин"
            ariaLabel="username"
            type="username"
            value={username}
            onChange={(e) => {
              console.log("Username:", e.target.value); // Проверьте, что значение обновляется
              setUsername(e.target.value);
            }}
          />
          <FormInput
            placeholder="Пароль"
            ariaLabel="password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            placeholder="Повторный пароль"
            ariaLabel="repeat-password"
            type={showPassword ? "text" : "password"}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="show-password"
              id="show-password"
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label style={{ marginLeft: 8 }} htmlFor="show-password">
              Показать пароль
            </label>
          </div>
          {error && <p className="message red">{error} !</p>}
          {sucsess && <p className="message green">{sucsess} !</p>}
          <button type="submit" className="btn-reg_log">
            Зарегистрироваться
          </button>
          <button className="btn-reg_log transparent-back adaptive">
            Войти
          </button>
        </form>
      </div>
      <div className="right-side">
        <h2 className="title">Привет, Чмо!</h2>
        <p className="form-description">
          Уже есть аккаунт ? Нажми кнопку “Войти” и продолжи свое путешествие
        </p>
        <button className="btn-reg_log transparent-back">Войти</button>
      </div>
    </section>
  );
}
