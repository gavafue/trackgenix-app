import React from 'react';
import styles from './inputText.module.css';

const Input = ({ label, id, type, placeholder }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        // name={name}
        type={type}
        placeholder={placeholder}
        // value={value}
        // onChange={onChange}
        // required={required}
      />
    </div>
  );
};

export default Input;
