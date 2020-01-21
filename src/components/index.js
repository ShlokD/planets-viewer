import { h } from "preact";

export const InputField = ({ id, labelText, type, value, onInput }) => {
  const setValue = ev => {
    onInput(ev.target.value);
  };

  return (
    <div className="flex flex-column items-center pt3">
      <label htmlFor={id} className="mr4 text-center">
        {labelText}
      </label>
      <input onInput={setValue} id={id} type={type} value={value}></input>
    </div>
  );
};
