import styles from './deleteModal.module.css';
import { useState } from 'react';
import FeedbackModal from '../FeedbackModal';

const DeleteModal = ({
  deleteTask,
  modalId,
  showDeleteModal,
  setShowDeleteModal,
  showFeedbackModal
}) => {
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  return (
    <div>
      <div id="id01" className={styles.modal}>
        <form className={styles.modalContent}>
          <div className={styles.container}>
            <h1>Delete Account</h1>
            <p>Are you sure you want to delete this timesheet?</p>
            <div className={styles.clearfix}>
              <button
                type="button"
                className={styles.cancelbtn}
                onClick={() => setShowDeleteModal(!showDeleteModal)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deletebtn}
                onClick={() => {
                  deleteTask(modalId, setContentFeedbackModal);
                  setShowDeleteModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
      {showFeedbackModal && (
        <FeedbackModal
          feedbackTitle={contentFeedbackModal.title}
          messageContent={contentFeedbackModal.description}
        />
      )}
    </div>
  );
};

export default DeleteModal;
