import React from 'react';
import styles from './button.module.css';

const Button = ({
  type = 'button',
  label,
  onClick,
  disabled,
  style,
  hidden,
  theme = 'primary'
}) => {
  return (
    <button
      type={type}
      className={`${styles[theme]} ${style} ${disabled && styles.disabled}
      ${hidden && styles.hidden}`}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
    >
      {label}
    </button>
  );
};

export default Button;
