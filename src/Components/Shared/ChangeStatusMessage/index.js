import React from 'react';
import Button from 'Components/Shared/Button';
import styles from 'Components/Shared/ChangeStatusMessage/changeStatusMessage.module.css';

const ChangeStatusMessage = ({
  resourceName,
  confirmChange,
  handleClose,
  idFromRow,
  setShowModal,
  operation
}) => {
  return (
    <div>
      <h1 className={styles.title}>Change Status</h1>
      <p>
        Are you sure you want to {operation} {resourceName}?
      </p>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Button
            label="Confirm"
            theme="primary"
            onClick={() => {
              confirmChange(idFromRow);
              setShowModal(false);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <Button theme="secondary" label="Cancel" onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusMessage;
