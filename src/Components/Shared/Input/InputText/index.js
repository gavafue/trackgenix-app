import React from 'react';
import styles from './inputText.module.css';

const Input = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={styles.input}
        id={props.id}
        name={props.name}
        type={props.type}
        defaultValue={props.value}
        required={props.required}
        placeholder={props.placeholder}
        {...props.register(props.name)}
      />
      {props.error && <sub className={styles.error}>{props.error}</sub>}
    </div>
  );
};

export default Input;
