import styles from './Input.module.css';

const Input = (name, type, placeholder, value, onChange, required, className = styles) => {
  return (
    <input
      className={className}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
