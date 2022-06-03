import styles from './deletemodal.module.css';
import { useState } from 'react';
import FeedbackModal from '../FeedbackModal';

const DeleteModal = (props) => {
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  return (
    <div>
      <div id="id01" className={styles.modal}>
        <span
          onClick={() => props.setShowDeleteModal(false)}
          className={styles.close}
          title="Close Modal"
        ></span>
        <form className={styles.modalContent}>
          <div className={styles.container}>
            <h1>Delete Account</h1>
            <p>Are you sure you want to delete the {props.namecomplete} account?</p>
            <div className={styles.clearfix}>
              <button
                type="button"
                className={styles.cancelbtn}
                onClick={() => props.setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deletebtn}
                onClick={() => {
                  props.deleteEmployee(props.modalId, setContentFeedbackModal);
                  props.setShowDeleteModal(false);
                  props.setShowFeedbackModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
      {props.showFeedbackModal && (
        <FeedbackModal
          feedbackTitle={contentFeedbackModal.title}
          messageContent={contentFeedbackModal.description}
        />
      )}
    </div>
  );
};

export default DeleteModal;
