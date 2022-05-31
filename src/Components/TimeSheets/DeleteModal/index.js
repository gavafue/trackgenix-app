import styles from './deleteModal.module.css';
import { useState } from 'react';
import FeedbackModal from '../FeedbackModal';

const DeleteModal = (props) => {
  let modalOfFeedback = document.getElementById('myModal');
  const changeVisibilityFeedbackModal = (string) => {
    modalOfFeedback.style.display = string;
  };
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});

  const changeVisibilityDeleteModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
  const deleteTimesheet = (string) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/timesheets/${string}`
    };
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.error === true) {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      } else {
        setContentFeedbackModal({ title: 'Request done!', description: res.message });
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <div>
      <div id="id01" className={styles.modal}>
        <span
          onClick={() => changeVisibilityDeleteModal('none')}
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
                onClick={() => changeVisibilityDeleteModal('none')}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deletebtn}
                onClick={() => {
                  deleteTimesheet(props.modalId);
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
