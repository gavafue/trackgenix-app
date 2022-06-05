import styles from './modal.module.css';

const Modal = ({ title, message, showModal, setShowModal, extras }) => {
  return (
    <div>
      <div id="id01" className={styles.modal}>
        <form className={styles.modalContent}>
          {title}
          {message}
          <div className={styles.container}>
            <div className={styles.clearfix}>
              <button
                type="button"
                className={styles.cancelbtn}
                onClick={() => setShowModal(!showModal)}
              >
                Close
              </button>
              {extras}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
