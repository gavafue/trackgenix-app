import styles from './styles.module.css';
import React from 'react';
import firebaseApp from 'helper/firebase';
import ErrorMessage from 'Components/Shared/ErrorMessage';
import { useSelector } from 'react-redux';

const AccountInactive = () => {
  const isActive = useSelector((state) => state.auth.authenticated.data.active);
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
