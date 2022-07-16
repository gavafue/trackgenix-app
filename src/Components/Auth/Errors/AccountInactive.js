import styles from './styles.module.css';
import React from 'react';
import firebaseApp from 'helper/firebase';

const AccountInactive = () => {
  const isActive = JSON.parse(sessionStorage.getItem('userStatus'));
  if (isActive === false) {
    firebaseApp.auth().signOut();
  }
  return (
    <section className={styles.container}>
      <p>This account is inactive</p>
    </section>
  );
};

export default AccountInactive;
