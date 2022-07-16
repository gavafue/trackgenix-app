import styles from './styles.module.css';
import React from 'react';

const NotAllowed = () => {
  return (
    <section className={styles.container}>
      <p>You are not allowed to come in here</p>
    </section>
  );
};

export default NotAllowed;
