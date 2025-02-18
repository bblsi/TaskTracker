import "./card.css";

export default function Card(props) {
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
          <button className="btn-card">Завершить</button>
        )}
      </div>
    </section>
  );
}
