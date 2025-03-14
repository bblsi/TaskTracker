import "./card.css";
import { useState } from "react";
import deleteIcon from "../../assets/close.png";
import CompleteButton from "./CompleteButton";

export default function Card(props) {
  console.log(props.data.status, "Card");
  return (
    <section className="card-container" key={props.data.id}>
      <div className="card-top" onClick={() => props.onOpenTask(true)}>
        <button
          className="btn-card-delete_cross"
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteTask(true, props.data.id);
          }}
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
        <h3 className="card-title">{props.data.title}</h3>

        <p className="card-desc">{props.data.description}</p>
      </div>
      <div className="card-bottom">
        <span className="card-task-end">
          Выполнить до:{" "}
          {props.data.timeToComplete ? props.data.timeToComplete : "не указано"}
        </span>
        <CompleteButton
          data={props.data}
          onCompleteTask={props.onCompleteTask}
        />{" "}
      </div>
    </section>
  );
}
