import styles from './styles.module.css';
import React from 'react';
import firebaseApp from 'helper/firebase';
import { useSelector } from 'react-redux';

const AccountInactive = () => {
  const isActive = useSelector((state) => state.auth.authenticated.data.active);
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
