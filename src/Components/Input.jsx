import React from 'react';
import './Input.css';

const Input = ({placeholder}) => {
  return (
    <div className="main-input">
        <div className="input">
            <input type="text" placeholder={placeholder} />
        </div>
    </div>
  );
};

export default Input;
