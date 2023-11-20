import React from "react";
import style from "./Button.module.css";

const Button = ({ icon, onClick, background, className, buttonType, disabled, ...props }) => {
  return (
    <button
      className={`${buttonType === "primary" ? style.primaryButton : style.button} ${className}`}
      disabled={disabled}
      style={{
        background: background,
      }}
      onClick={onClick}
    >
      {icon} {props.children}
    </button>
  );
};

export default Button;
