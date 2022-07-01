import styles from './login.module.css';
import React from 'react';
import Form from './Form';

const Login = () => {
  return (
    <section className={styles.container}>
      <Form />
    </section>
  );
};

export default Login;
