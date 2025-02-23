import "./card.css";
import { useState } from "react";

export default function Card(props) {
  const [completeTask, setCompleteTask] = useState(props.data.isCompleted);
  return (
    <section className="card-container" key={props.data.id}>
      <h3 className="card-title">{props.data.title}</h3>
      <p className="card-desc">{props.data.description}</p>
      <div className="card-bottom">
        <span className="card-task-end">
          Выполнить до:{" "}
          {props.data.timeToComplete ? props.data.timeToComplete : "не указано"}
        </span>

        {props.data.isCompleted ? (
          <button className="btn-card completed">Выполнено</button>
        ) : (
          <button
            className="btn-card"
            onClick={() => props.onCompleteTask(props.data.id)}
          >
            Завершить
          </button>
        )}
      </div>
    </section>
  );
}
