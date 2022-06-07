import styles from './index.module.css';

const FeedbackMessage = ({ infoForFeedback }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {infoForFeedback.title}</h1>
      <p>{infoForFeedback.description}</p>
    </div>
  );
};

export default FeedbackMessage;
