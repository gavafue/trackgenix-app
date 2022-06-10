import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './admins.module.css';
import AdminsTable from './Table';
import Preloader from '../Shared/Preloader';
import Button from '../Shared/Button';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}`;
  const history = useHistory();
  useEffect(() => {
    setShowPreloader(true);
    fetch(`${url}/admins`)
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data.data);
        setShowPreloader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Button label="Add new admin +" onClick={() => history.push(`/admins/form/`)} />
      <AdminsTable admins={admins} showModal={showModal} setShowModal={setShowModal} />
      {showPreloader && <Preloader />}
    </section>
  );
};

export default Admins;
