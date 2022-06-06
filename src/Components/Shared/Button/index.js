import React from 'react';
import styles from './button.module.css';

const Button = ({ type, className, onClick, text, isDisabled }) => {
  return (
    <button
      type={type}
      className={isDisabled ? className : styles.sharedButton}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
