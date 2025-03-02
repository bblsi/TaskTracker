export default function DeleteTaskModal(props) {
  return (
    <div className="overlay">
      <div className="delete-task-modal">
        <h3>Вы действительно хотите удалить задание ?</h3>
        <button onClick={() => props.onDeleteTask(true)}>Да</button>
        <button onClick={() => props.onDeleteTask(false)}>Нет</button>
      </div>
    </div>
  );
}
