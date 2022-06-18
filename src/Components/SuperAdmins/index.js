import { useEffect } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import Preloader from '../Shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInfoForDelete,
  showDeleteMessage,
  showFeedbackMessage,
  getSelectedItem,
  cleanSelectedItem
} from '../../redux/superadmin/actions';
import { deleteSuperAdmin, getSuperadmins } from '../../redux/superadmin/thunks';

const SuperAdmins = () => {
  const dispatch = useDispatch();
  const superadmins = useSelector((state) => state.superadmins.list);
  const isPending = useSelector((state) => state.superadmins.isPending);
  const infoForFeedback = useSelector((state) => state.superadmins.infoForFeedback);
  const deleteInfo = useSelector((state) => state.superadmins.infoForDelete);
  const showDelete = useSelector((state) => state.superadmins.showDeleteMessage);
  const showFeedback = useSelector((state) => state.superadmins.showFeedbackMessage);

  useEffect(() => {
    dispatch(cleanSelectedItem());
  }, []);

  const history = useHistory();
  const editData = (row) => {
    dispatch(getSelectedItem(row));
    history.push(`/super-admins/form/`);
  };

  const createSuperAdmin = () => {
    history.push('/super-admins/form');
  };

  useEffect(() => {
    dispatch(getSuperadmins());
  }, []);

  const deleteHandler = () => {
    dispatch(deleteSuperAdmin(deleteInfo));
  };

  const superAdminData = superadmins.map((superAdmin) => {
    return {
      ...superAdmin,
      active: superAdmin.active,
      isActive: superAdmin.active ? 'Yes' : 'No'
    };
  });

  return (
    <section className={styles.container}>
      <h1>Super Admins</h1>
      <div className={styles.buttonContainer}>
        <Button onClick={createSuperAdmin} label="Add new super admin" />
      </div>
      <Table
        data={superAdminData}
        headersName={['Name', 'Last Name', 'Email', 'Role', 'Active']}
        headers={['firstName', 'lastName', 'email', 'role', 'isActive']}
        setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        setInfoForDelete={(superAdminId) => dispatch(setInfoForDelete(superAdminId))}
        editData={editData}
        deleteSuperAdmin={deleteHandler}
      />
      <Modal
        isOpen={showDelete}
        handleClose={() => {
          dispatch(showDeleteMessage(!showDelete));
        }}
      >
        <DeleteMessage
          handleClose={() => {
            dispatch(showDeleteMessage(!showDelete));
          }}
          infoForDelete={deleteInfo}
          deleteItem={deleteHandler}
          setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        />
      </Modal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default SuperAdmins;
