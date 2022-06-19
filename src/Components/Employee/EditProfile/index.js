import styles from './editProfile.module.css';
import React from 'react';
import Form from './Form';

function editProfile() {
  return (
    <section className={styles.container}>
      <Form />
    </section>
  );
}

export default editProfile;
