import { useState, useEffect } from "react";
import Header from "./Header";
import CreateTaskModal from "./CreateTaskModal";
import CreateCategoryModal from "./CreateCategoryModal";
import CategoryButton from "../elements/CategoryButton";
import Card from "../elements/Card";
import ActionButton from "../elements/ActionButton";
import DeleteTaskModal from "../elements/DeleteTaskModal";
import "./style/MainPage.css";

import allTasksIcon from "../../assets/all.png";
import completedTasksIcon from "../../assets/completed.png";
import incompletedTasksIcon from "../../assets/incompleted.png";
import importantTasksIcon from "../../assets/important.png";
import customTaskIcon from "../../assets/custom-icon.png";

import {
  fetchAllTasks,
  fetchCategories,
  fetchImportantTasks,
  fetchTasksByStatus,
} from "../data/data";

export default function MainPage() {
  const [categories, setCategories] = useState([
    { name: "all", id: 1 },
    { name: "completed", id: 2 },
    { name: "incompleted", id: 3 },
    { name: "important", id: 4 },
  ]);
  const [customCategories, setCustomCategories] = useState([]);
  const [cardData, setCardData] = useState([]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState(null);

  const [display, setDisplay] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryIcons = {
    all: allTasksIcon,
    completed: completedTasksIcon,
    incompleted: incompletedTasksIcon,
    important: importantTasksIcon,
    custom: customTaskIcon,
  };

  function handleOpenTaskModal(isOpen) {
    return setIsTaskModalOpen(isOpen);
  }
  function handleOpenCategoryModal(isOpen, isDisplay) {
    return setIsCategoryModalOpen(isOpen), setDisplay(isDisplay);
  }
  function handleOpenDeleteModal(isOpen, taskId) {
    return setIsDeleteModalOpen(isOpen), setTaskToDelete(taskId);
  }
  function handleFilterCategory(categoryName) {
    return setCategoryFilter(categoryName);
  }

  useEffect(() => {
    const loadTasks = async () => {
      try {
        let tasks;
        if (categoryFilter === "important") {
          tasks = await fetchImportantTasks();
        } else if (categoryFilter === "completed") {
          tasks = await fetchTasksByStatus("COMPLETED");
        } else if (categoryFilter === "incompleted") {
          tasks = await fetchTasksByStatus("CREATED");
        } else {
          tasks = await fetchAllTasks();
        }
        setCardData(tasks);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      }
    };
    loadTasks();
  }, [categoryFilter]);
  console.log(categoryFilter);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCustomCategories(categories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    loadCategories();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://89.22.225.116:8080/api/task/${taskId}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Задача завершена");

        setCardData((previousCardData) =>
          previousCardData.map((task) =>
            task.id === taskId ? { ...task, isCompleted: true } : task
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Ошибка сервера:", errorData);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  const handleDeleteTask = async (confirm) => {
    if (confirm && taskToDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://89.22.225.116:8080/api/task/${taskToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log("Задача удалена");
          setCardData((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskToDelete)
          );
        } else {
          const errorData = await response.json();
          console.error("Ошибка сервера:", errorData);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    }
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const defaultCategories = categories.map((category) => (
    <CategoryButton
      key={category.id}
      name={category.name}
      img={categoryIcons[category.name]}
      onFilterCategory={handleFilterCategory}
    />
  ));
  const сustomCategories = customCategories.map((category) => (
    <CategoryButton
      key={category.id}
      name={category.name}
      img={categoryIcons["custom"]}
      onFilterCategory={handleFilterCategory}
    />
  ));

  const cardsToRender = cardData.map((card) => (
    <Card
      key={card.id}
      data={card}
      onCompleteTask={handleCompleteTask}
      onDeleteTask={handleOpenDeleteModal}
    />
  ));

  return (
    <>
      <Header />
      <main
        className="main"
        onClick={() => handleOpenCategoryModal(false, " ")}
      >
        {isDeleteModalOpen && (
          <DeleteTaskModal onDeleteTask={handleDeleteTask} />
        )}
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
            {defaultCategories} {сustomCategories}{" "}
          </div>
        </div>

        <div className="cards">{cardsToRender}</div>
        {isTaskModalOpen && <CreateTaskModal onIsOpen={handleOpenTaskModal} />}
      </main>
    </>
  );
}
