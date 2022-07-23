import React from 'react';
import styles from './inputSelect.module.css';

const Select = ({
  id,
  name,
  placeholder,
  required,
  register = () => {},
  multiple,
  label,
  arrayToMap,
  error,
  onChange
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
        defaultValue={multiple ? [''] : ''}
        required={required}
        multiple={multiple}
        {...register(name)}
        onChange={onChange}
      >
        {arrayToMap.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {`${item.optionContent}`}
            </option>
          );
        })}
        ;
        <option value={multiple ? [''] : ''} disabled hidden>
          {placeholder}
        </option>
      </select>
      {error && <sub className={styles.error}>{error}</sub>}
    </div>
  );
};

export default Select;
