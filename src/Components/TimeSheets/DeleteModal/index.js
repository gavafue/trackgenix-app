import styles from './deleteModal.module.css';
import { useState } from 'react';
import FeedbackModal from '../FeedbackModal';

const DeleteModal = (props) => {
  let modalOfFeedback = document.getElementById('myModal');
  const changeVisibilityFeedbackModal = (string) => {
    modalOfFeedback.style.display = string;
  };
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  return (
    <div>
      <div id="id01" className={styles.modal}>
        <span
          onClick={() => props.changeVisibilityDeleteModal('none')}
          className={styles.close}
          title="Close Modal"
        ></span>
        <form className={styles.modalContent}>
          <div className={styles.container}>
            <h1>Delete Account</h1>
            <p>Are you sure you want to delete this timesheet?</p>

            <div className={styles.clearfix}>
              <button
                type="button"
                className={styles.cancelbtn}
                onClick={() => props.changeVisibilityDeleteModal('none')}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deletebtn}
                onClick={() => {
                  props.deleteTimesheet(props.modalId, setContentFeedbackModal);
                  changeVisibilityFeedbackModal('block');
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
      <FeedbackModal
        feedbackTitle={contentFeedbackModal.title}
        messageContent={contentFeedbackModal.description}
      />
    </div>
  );
};

export default DeleteModal;
