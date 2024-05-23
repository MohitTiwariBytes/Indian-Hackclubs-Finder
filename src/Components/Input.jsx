import React from 'react';
import './Input.css';

const Input = ({placeholder}) => {
  return (
    <div className="main-input">
        <div className="input">
            <input type="text" placeholder={placeholder} /> 
            <i class="fa-solid fa-magnifying-glass fa-2x"></i>
        </div>
    </div>
  );
};

export default Input;
