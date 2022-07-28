import styles from './styles.module.css';
import React from 'react';
import ErrorMessage from 'Components/Shared/ErrorMessage';

const NotAllowed = () => {
  return (
    <section className={styles.container}>
      <ErrorMessage
        title="Ooops!"
        content="You are not allowed to come in here,
        please check the page that you are trying to enter."
      />
    </section>
  );
};

export default NotAllowed;
