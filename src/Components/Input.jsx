import React from "react";
import "./Input.css";

const Input = ({ placeholder, value, onChange }) => {
  
  return (
    <div className="main-input">
      <div className="input">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <i className="fa-solid fa-magnifying-glass fa-2x"></i>
      </div>
    </div>
  );
};

export default Input;
