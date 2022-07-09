import styles from './home.module.css';
import React from 'react';
import HomeForUser from 'Components/Shared/HomeForUser';

const Home = () => {
  return (
    <section className={styles.container}>
      <HomeForUser />
    </section>
  );
};

export default Home;
