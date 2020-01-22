import { h } from "preact";

export const InputField = ({ id, labelText, type, value, onInput }) => {
  const setValue = ev => {
    onInput(ev.target.value);
  };

  return (
    <input
      className="br-pill pa2 mt2"
      placeholder={labelText}
      onInput={setValue}
      id={id}
      type={type}
      value={value}
    ></input>
  );
};
