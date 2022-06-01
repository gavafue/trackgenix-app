import styles from './modal.module.css';
import { useState } from 'react';
import FeedbackModal from '../FeedbackModal';

const DeleteModal = (props) => {
  let modalOfFeedback = document.getElementById('myFeedbackModal');
  const changeVisibilityFeedbackModal = (string) => {
    modalOfFeedback.style.display = string;
  };
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});

  const changeVisibilityDeleteModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
  const OnClickDelete = (string) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/admins/${string}`
    };
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.error === true) {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      } else {
        setContentFeedbackModal({ title: 'Admin deleted!', description: res.message });
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
            <h1>Delete Admin</h1>
            <p>Are you sure you want to delete this admin?</p>

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
                  OnClickDelete(props.modalId);
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
