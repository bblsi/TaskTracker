import { useState } from "react";
import "../../src/index.css";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://89.22.225.116:8080/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      console.log(response.status);
      const text = await response.text();
      console.log("Текст ответа:", text);
      const data = await response.json();
      console.log("Ответ:", data);
      if (response.ok) {
        alert("Регистрация успешна, теперь войдите в систему");
      } else {
        alert(data.message || "Ошибка регистрации");
      }
    } catch (error) {
      alert("Ошибка сети");
    }
  };

  const handleUsername = async () => {
    try {
      const response = await fetch(
        "http://89.22.225.116:8080/api/auth/username",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Вход выполнен успешно!");
      } else {
        alert(data.message || "Ошибка входа");
      }
    } catch (error) {
      alert("Ошибка сети");
    }
  };

  const fetchTasks = async (endpoint) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://89.22.225.116:8080/api/tasks${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Задачи:", data);
      } else {
        alert(data.message || "Ошибка получения задач");
      }
    } catch (error) {
      alert("Ошибка сети");
    }
  };

  return (
    <div>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <button onClick={handleUsername}>Войти</button>
      <button onClick={() => fetchTasks("")}>Получить задачи</button>
      <button onClick={() => fetchTasks("/add")}>Добавить задачу</button>
    </div>
  );
}
