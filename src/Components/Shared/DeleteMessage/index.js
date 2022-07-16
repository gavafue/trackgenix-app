import React from 'react';
import Button from 'Components/Shared/Button';
import styles from './deleteMessage.module.css';

const DeleteMessage = ({ resourceName, deleteItem, handleClose, idFromRow, setShowModal }) => {
  return (
    <div>
      <h1 className={styles.title}>Delete {resourceName}</h1>
      <p>Are you sure you want to delete?</p>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Button
            label="Delete"
            theme="secondary"
            onClick={() => {
              deleteItem(idFromRow);
              setShowModal(false);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <Button label="Cancel" onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default DeleteMessage;
