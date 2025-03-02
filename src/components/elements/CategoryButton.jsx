import { useState } from "react";

export default function CategoryButton(props) {
  return (
    <button
      className="btn-category"
      onClick={() => props.onFilterCategory(props.name)}
    >
      <img src={props.img} alt={props.name} />
      {props.name === "all"
        ? "Все задания"
        : props.name === "completed"
        ? "Выполненные задания"
        : props.name === "incompleted"
        ? "Невыполненные задания"
        : props.name === "important"
        ? "Важные задания"
        : props.name}
    </button>
  );
}
