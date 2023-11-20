import React from "react";
import style from "./DropDown.module.css";

const Dropdown = ({
  optionsData,
  value,
  onClick,
  placeholder,
  className,
  ...props
}) => {
  return (
    <select
      placeholder={placeholder}
      value={value}
      className={`${className} ${style.select}`}
      onChange={onClick}
    >
      <option value={placeholder}> {placeholder}</option>
      {(optionsData || []).map((val, idx) => {
        return <option value={val}>{val}</option>;
      })}
    </select>
  );
};

export default Dropdown;
