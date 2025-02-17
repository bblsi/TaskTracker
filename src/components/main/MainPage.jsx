import { useState } from "react";
import HeaderElement from "./HeaderElement";
import CategoryButton from "../elements/CategoryButton";
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

  const categoryIcons = {
    all: allTasksIcon,
    completed: completedTasksIcon,
    incompleted: incompletedTasksIcon,
    important: importantTasksIcon,
  };

  const allCategories = categories.map((category) => (
    <CategoryButton type={category} img={categoryIcons[category]} />
  ));
  return (
    <section>
      <HeaderElement />

      <main>
        <div className="category-sidebar">{allCategories}</div>
      </main>
    </section>
  );
}
