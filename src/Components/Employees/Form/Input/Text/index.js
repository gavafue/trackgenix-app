import styles from './input.module.css';
const Input = (props) => {
  const title = (string) => {
    if (string.indexOf('-') != -1) {
      const newstring = string.replace('-', ' ');
      return newstring[0].toUpperCase() + newstring.slice(1);
    }
    return string[0].toUpperCase() + string.slice(1);
  };
  return (
    <div>
      <label>{title(props.name)}</label>
      <input
        className={styles.formInput}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        disabled={props.disabled}
      ></input>
    </div>
  );
};

export default Input;
