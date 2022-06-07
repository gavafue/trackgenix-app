import styles from './deletemodal.module.css';
import { useState } from 'react';
import FeedbackModal from '../FeedbackModal';

const DeleteModal = ({ deleteSuperAdmin, modalId, showModal, setShowModal, showFeedbackModal }) => {
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  return (
    <div>
      <div id="id01" className={styles.modal}>
        <form className={styles.modalContent}>
          <div className={styles.container}>
            <h1>Delete Account</h1>
            <p>Are you sure you want to delete this project?</p>

            <div className={styles.clearfix}>
              <button
                type="button"
                className={styles.cancelbtn}
                onClick={() => setShowModal(!showModal)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deletebtn}
                onClick={() => {
                  deleteSuperAdmin(modalId, setContentFeedbackModal);
                  setShowModal(false);
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
          // showFeedbackModal={showFeedbackModal}
          // setShowFeedbackModal={setShowFeedbackModal}
        />
      )}
    </div>
  );
};

export default DeleteModal;