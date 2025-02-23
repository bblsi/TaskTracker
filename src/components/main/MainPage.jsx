import { useState, useEffect } from "react";
import HeaderElement from "./HeaderElement";
import CreateTaskModal from "./CreateTaskModal";
import CreateCategoryModal from "./CreateCategoryModal";
import CategoryButton from "../elements/CategoryButton";
import Card from "../elements/Card";
import ActionButton from "../elements/ActionButton";
import "./style/MainPage.css";

import allTasksIcon from "../../assets/all.png";
import completedTasksIcon from "../../assets/completed.png";
import incompletedTasksIcon from "../../assets/incompleted.png";
import importantTasksIcon from "../../assets/important.png";
import customTaskIcon from "../../assets/custom-icon.png";

export default function MainPage() {
  const [categories, setCategories] = useState([
    "all",
    "completed",
    "incompleted",
    "important",
  ]);
  const [customCategories, setCustomCategories] = useState([]);

  const [currentCategory, setCurrentCategory] = useState("all");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [display, setDisplay] = useState("");
  const [cardData, setCardData] = useState([]);

  const categoryIcons = {
    all: allTasksIcon,
    completed: completedTasksIcon,
    incompleted: incompletedTasksIcon,
    important: importantTasksIcon,
    custom: customTaskIcon,
  };

  function handleCompleteTask(taskId) {
    return setCardData((previousCardData) =>
      previousCardData.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true } : task
      )
    );
  }

  function handleOpenTaskModal(isOpen) {
    return setIsTaskModalOpen(isOpen);
  }
  function handleOpenCategoryModal(isOpen, isDisplay) {
    return setIsCategoryModalOpen(isOpen), setDisplay(isDisplay);
  }
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Токен отсутствует. Пожалуйста, войдите в систему.");
        }

        const response = await fetch("http://89.22.225.116:8080/api/task/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Ошибка сервера:", errorText);
        }

        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Токен отсутствует. Пожалуйста, войдите в систему.");
        }

        const response = await fetch(
          "http://89.22.225.116:8080/api/task/category",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Ошибка сервера:", errorText);
        }

        const data = await response.json();
        setCustomCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchTasks();
  }, []);

  const allCategories = categories.map((category) => (
    <CategoryButton type={category} img={categoryIcons[category]} />
  ));
  const allCustomCategories = customCategories.map((category) => (
    <CategoryButton
      type={category.id}
      key={category.id}
      name={category.name}
      img={categoryIcons["custom"]}
    />
  ));

  const allCards = cardData.map((card) => (
    <Card data={card} onCompleteTask={handleCompleteTask} />
  ));

  return (
    <>
      <HeaderElement />

      <main
        className="main"
        onClick={() => handleOpenCategoryModal(false, " ")}
      >
        <div className="main-sidebar">
          <div className="buttons-sidebar" onClick={(e) => e.stopPropagation()}>
            <ActionButton
              text="Создать категорию"
              onIsOpen={handleOpenCategoryModal}
              display={display}
            />
            {isCategoryModalOpen && (
              <CreateCategoryModal onIsOpen={handleOpenCategoryModal} />
            )}

            <ActionButton
              text="Создать задачу"
              onIsOpen={handleOpenTaskModal}
            />
          </div>
          <div className="category-sidebar">
            {allCategories} {allCustomCategories}{" "}
          </div>
        </div>

        <div className="cards">{allCards}</div>
        {isTaskModalOpen && <CreateTaskModal onIsOpen={handleOpenTaskModal} />}
      </main>
    </>
  );
}
