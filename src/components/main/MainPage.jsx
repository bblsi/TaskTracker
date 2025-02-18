import { useState } from "react";
import HeaderElement from "./HeaderElement";
import CategoryButton from "../elements/CategoryButton";
import Card from "../elements/Card";
import "./style/MainPage.css";

import allTasksIcon from "../../assets/icons/all.png";
import completedTasksIcon from "../../assets/icons/completed.png";
import incompletedTasksIcon from "../../assets/icons/incompleted.png";
import importantTasksIcon from "../../assets/icons/important.png";

export default function MainPage() {
  const [categories, setCategories] = useState([
    "all",
    "completed",
    "incompleted",
    "important",
  ]);

  const cardData = [
    {
      id: 1,
      title: "Название Задания 1",
      description:
        "Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев",
      important: true,
      timeToComplete: "24.02.25 - 10:00",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Название Задания 2",
      description:
        "Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев",
      important: false,
      timeToComplete: "",
      isCompleted: false,
    },
  ];

  const categoryIcons = {
    all: allTasksIcon,
    completed: completedTasksIcon,
    incompleted: incompletedTasksIcon,
    important: importantTasksIcon,
  };

  const allCategories = categories.map((category) => (
    <CategoryButton type={category} img={categoryIcons[category]} />
  ));

  const allCards = cardData.map((card) => <Card data={card} />);
  return (
    <section>
      <HeaderElement />

      <main className="main">
        <div className="category-sidebar">{allCategories}</div>
        <div className="cards">{allCards}</div>
      </main>
    </section>
  );
}
