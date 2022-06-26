import styles from './home.module.css';
import React from 'react';

const Home = () => {
  return (
    <section className={styles.container}>
      <div className={styles.images}>
        <div className={styles.firstTwo}>
          <img src="https://thumbs.dreamstime.com/b/new-future-technology-concept-abstract-background-business-solution-54350985.jpg" />
          <img src="https://media.istockphoto.com/photos/data-scientists-male-programmer-using-laptop-analyzing-and-developing-picture-id1295900106?k=20&m=1295900106&s=612x612&w=0&h=hDkQP1a9dUo4Esv8iMyVlEnP4nfN2mwM5LdtPW9M8zo=" />
        </div>
        <div className={styles.secondTwo}>
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          <img src="https://www.informediate.com/wp-content/uploads/2014/10/technology-300x227.jpg" />
        </div>
      </div>
    </section>
  );
};

export default Home;
