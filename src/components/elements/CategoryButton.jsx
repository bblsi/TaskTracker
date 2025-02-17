export default function CategoryButton(props) {
  return (
    <button className="btn-category">
      <img src={props.img} alt={props.type} />
      {props.type === "all"
        ? "Все задания"
        : props.type === "completed"
        ? "Выполненные задания"
        : props.type === "incompleted"
        ? "Невыполненные задания"
        : props.type === "important"
        ? "Важные задания"
        : props.type}
    </button>
  );
}
