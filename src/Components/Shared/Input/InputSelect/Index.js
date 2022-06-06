import React from 'react';
import styles from './Select.module.css';

const Select = ({
  className = styles,
  arrayToMap,
  itemValue,
  id,
  name,
  onChange,
  required,
  value
}) => {
  return (
    <select
      className={className}
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      required={required}
    >
      {arrayToMap.map((item) => {
        return (
          <option selected={Boolean(item._id === itemValue)} key={item._id} value={item._id}>
            {`${item.params}`}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
