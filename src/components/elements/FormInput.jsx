export default function FormInput(props) {
  return (
    <>
      <input
        className="form-input"
        type={props.type}
        placeholder={props.placeholder}
        aria-label={props.ariaLabel}
      />
    </>
  );
}
