import React from "react";

function InputComponent({
  id,
  name,
  onChange,
  onBlur,
  values,
  className,
  type,
  placeholder,
  onClick,
  defaultValue,
  disabled,
  maxLength,
  minLength,
  onKeyDown,
  max,
  inputmode,
  pattern,
  onkeypress
}) {
  return (
    <>
      <input
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={values}
        className={className}
        type={type}
        placeholder={placeholder}
        onClick={onClick}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        onKeyDown={onKeyDown}
        max={max}
        inputMode={inputmode}
        pattern={pattern}
        onKeyPress={onkeypress}
      />
    </>
  );
}

export default InputComponent;
