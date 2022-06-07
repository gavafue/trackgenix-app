import React from 'react';
import Button from '../Button';
import styles from './deleteMessage.module.css';

const DeleteMessage = ({ resourceName, deleteItem, handleClose, infoForDelete, setShowModal }) => {
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
              deleteItem(infoForDelete);
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
