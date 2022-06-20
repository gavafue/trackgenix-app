import React from 'react';
import styles from './inputSelect.module.css';

const Select = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <select
        className={styles.select}
        id={props.id}
        name={props.name}
        defaultValue={props.value ?? props.placeholder}
        required={props.equired}
        multiple={props.multiple}
        {...props.register(props.name)}
      >
        {props.arrayToMap.map((item) => {
          return (
            <option
              // defaultValue={Boolean(item.id === props.itemValue)}
              key={item.id}
              value={item.id}
            >
              {`${item.optionContent}`}
            </option>
          );
        })}
        ;
        <option value={props.placeholder} disabled hidden>
          {props.placeholder}
        </option>
      </select>
      {props.error && <sub className={styles.error}>{props.error}</sub>}
    </div>
  );
};

export default Select;
