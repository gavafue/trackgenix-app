import styles from './editProfile.module.css';
import React from 'react';
import Form from './Form';

const EditProfile = () => {
  return (
    <section className={styles.container}>
      <Form />
    </section>
  );
};

export default EditProfile;
