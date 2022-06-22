import React from 'react';
import styles from './inputText.module.css';

const Input = ({ label, register = () => {}, id, name, type, required, placeholder, error }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <sub className={styles.error}>{error}</sub>}
    </div>
  );
};

export default Input;
