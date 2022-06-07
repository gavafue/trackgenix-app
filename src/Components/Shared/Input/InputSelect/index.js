import React from 'react';
import styles from './inputSelect.module.css';

const Select = ({
  arrayToMap,
  itemValue,
  label,
  id,
  name,
  onChange,
  required,
  value,
  placeholder
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
            <option defaultValue={Boolean(item.id === itemValue)} key={item.id} value={item.id}>
              {`${item.optionContent}`}
            </option>
          );
        })}
        ;
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
      </select>
    </div>
  );
};

export default Select;
