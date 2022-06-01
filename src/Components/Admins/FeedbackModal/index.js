import styles from './modal.module.css';

const FeedbackModal = (props) => {
  // Get the modal
  let modalOfFeedback = document.getElementById('myFeedbackModal');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modalOfFeedback) {
      modalOfFeedback.style.display = 'none';
    }
  };
  return (
    <div>
      <div id="myFeedbackModal" className={styles.modal}>
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
