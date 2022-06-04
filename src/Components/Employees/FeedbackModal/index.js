import styles from './feedbackmodal.module.css';
const FeedbackModal = (props) => {
  return (
    <div>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <span
              className={styles.close}
              onClick={() => {
                props.setShowFeedbackModal(false);
              }}
            >
              X
            </span>
            <h2>{props.feedbackTitle}</h2>
          </div>
          <div className={styles.modalBody}>
            <p>{props.messageContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
