import styles from './errormsg.module.css';
const ErrorMessage = ({ title, content }) => {
  return (
    <div className={styles.errormsg}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default ErrorMessage;
