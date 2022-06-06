import styles from './feedbackmodal.module.css';

const FeedbackModal = ({ setShowFeedbackModal, feedbackTitle, messageContent }) => {
  return (
    <div>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <span
              className={styles.close}
              onClick={() => {
                setShowFeedbackModal(false);
              }}
            >
              X
            </span>
            <h2>{feedbackTitle}</h2>
          </div>
          <div className={styles.modalBody}>
            <p>{messageContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
