import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins } from 'redux/admins/thunks';
import styles from './admins.module.css';
import AdminsTable from './Table';
import Button from 'Components/Shared/Button';

const Admins = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Button label="Add new admin" onClick={() => history.push(`/admins/form/`)} />
      <AdminsTable admins={admins} />
    </section>
  );
};

export default Admins;
