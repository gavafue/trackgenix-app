import React from 'react';
import styles from './inputSelect.module.css';

const Select = ({
  id,
  name,
  value,
  placeholder,
  required,
  register = () => {},
  multiple,
  label,
  arrayToMap,
  error
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        className={styles.select}
        id={id}
        name={name}
        defaultValue={value ?? placeholder}
        required={required}
        multiple={multiple}
        {...register(name)}
      >
        {arrayToMap.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {`${item.optionContent}`}
            </option>
          );
        })}
        ;
        <option value={placeholder} disabled hidden>
          {placeholder}
        </option>
      </select>
      {error && <sub className={styles.error}>{error}</sub>}
    </div>
  );
};

export default Select;
