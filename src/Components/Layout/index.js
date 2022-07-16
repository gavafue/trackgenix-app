import { Suspense, useEffect } from 'react';
import { tokenListener } from 'helper/firebase';
import styles from './layout.module.css';
import Header from 'Components/Shared/Header/index';
import Navbar from 'Components/Shared/Navbar';
import Footer from 'Components/Shared/Footer/index';
import Preloader from 'Components/Shared/Preloader';

function Layout(props) {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Header />
        <Suspense fallback={<Preloader />}>{props.children}</Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
