import React from 'react';
import styles from './select.module.css';

const Select = ({
  arrayToMap,
  itemValue,
  label,
  id,
  name,
  onChange,
  required,
  value,
  defaultValue
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.select}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        required={required}
      >
        {arrayToMap.map((item) => {
          return (
            <option selected={Boolean(item.id === itemValue)} key={item.id} value={item.id}>
              {`${item.params}`}
            </option>
          );
        })}
        ;
        <option value="" disabled selected hidden>
          {defaultValue}
        </option>
      </select>
    </div>
  );
};

export default Select;
