import "./card.css";
import { useState } from "react";
import deleteIcon from "../../assets/close.png";

export default function Card(props) {
  return (
    <section className={"card-container"} key={props.data.id}>
      <div className="card-top">
        <button
          className="btn-card-delete"
          onClick={() => props.onDeleteTask(true, props.data.id)}
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

        {props.data.isCompleted || props.data.status == "COMPLETED" ? (
          <button className="btn-card-complete completed">Выполнено</button>
        ) : (
          <button
            className="btn-card-complete"
            onClick={() => props.onCompleteTask(props.data.id)}
          >
            Завершить
          </button>
        )}
      </div>
    </section>
  );
}
