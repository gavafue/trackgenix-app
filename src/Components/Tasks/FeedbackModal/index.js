import styles from './feedbackModal.module.css';

const FeedbackModal = (props) => {
  let modalOfFeedback = document.getElementById('myModal');

  window.onclick = function (event) {
    if (event.target == modalOfFeedback) {
      modalOfFeedback.style.display = 'none';
    }
  };
  return (
    <div>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <span
              className={styles.close}
              onClick={() => {
                modalOfFeedback.style.display = 'none';
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
