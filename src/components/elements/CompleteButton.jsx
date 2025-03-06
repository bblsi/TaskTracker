export default function CompleteButton(props) {
  return (
    <>
      {props.data.isCompleted || props.data.status == "COMPLETED" ? (
        <button className="btn-card-complete completed">Выполнено</button>
      ) : (
        <button
          className="btn-card-complete"
          onClick={() => {
            props.onCompleteTask(props.data.id);
          }}
        >
          Завершить
        </button>
      )}
    </>
  );
}
