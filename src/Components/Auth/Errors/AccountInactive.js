import styles from './styles.module.css';
import React from 'react';
import firebaseApp from 'helper/firebase';
import ErrorMessage from 'Components/Shared/ErrorMessage';

const AccountInactive = () => {
  const isActive = JSON.parse(sessionStorage.getItem('userStatus'));
  if (isActive === false) {
    firebaseApp.auth().signOut();
  }
  return (
    <section className={styles.container}>
      <ErrorMessage
        title="Ooops!"
        content="This account is inactive. Please contact an administrator"
      />
    </section>
  );
};

export default AccountInactive;
