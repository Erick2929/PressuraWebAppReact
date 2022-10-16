import "./InputElement.css";

const InputElement = ({ title, inputValue, onChangeInput, autoComplete }) => {
  const saveInput = (e) => {
    onChangeInput(e.target.value);
  };

  return (
    <div className="input-element">
      <p>{title}</p>
      <input
        type="text"
        value={inputValue}
        onChange={saveInput}
        autoComplete={autoComplete}
      />
    </div>
  );
};

InputElement.defaultProps = {
  autoComplete: "on",
};

export default InputElement;
