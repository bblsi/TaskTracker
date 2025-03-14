import { useState } from "react";
import checkMarkIcon from "../../assets/check-mark.png";
import "./style/CreateCategoryModal.css";

export default function CreateCategoryModal() {
  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState("");
  const [name, setName] = useState("");
  console.log(name);

  const handleCreateCategory = async () => {
    setError("");

    if (!name) {
      setError("Название не может быть пустым");
      return;
    } else if (name.length < 3) {
      return setError("Название не может быть короче 3 символов");
    }
    try {
      const token = localStorage.getItem("token"); // Получаем токен из localStorage
      console.log("Токен:", token);
      const response = await fetch(
        "http://89.22.225.116:8080/api/task/category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
          },
          body: JSON.stringify({ name }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Категория создана:", data);
        setName("");
      } else {
        const errorData = await response.json();
        console.error("Ошибка сервера:", errorData);
        setError(errorData.message || "Ошибка при создании категории");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setError("Ошибка сети");
    }
  };

  return (
    <div className="wrapper-create_category">
      <button className="btn-create_category" onClick={handleCreateCategory}>
        <img src={checkMarkIcon} alt="" />
      </button>
      <input
        type="text"
        value={name}
        className="input-create_category"
        placeholder="Введите название категории"
        onChange={(e) => setName(e.target.value)}
      />
      {error && (
        <p style={{ marginBottom: 10 }} className="message red">
          {error}!
        </p>
      )}
    </div>
  );
}
