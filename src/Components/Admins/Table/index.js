import styles from '../admins.module.css';
import { useEffect } from 'react';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import DeleteMessage from 'Components/Shared/DeleteMessage';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Button from 'Components/Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAdmin } from 'redux/admins/thunks';
import {
  getSelectedAdmin,
  setidFromRow,
  showDeleteMessage,
  showFeedbackMessage,
  cleanSelectedAdmin
} from 'redux/admins/actions';

const AdminsTable = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const isPending = useSelector((state) => state.admins.isPending);
  const feedbackInfo = useSelector((state) => state.admins.infoForFeedback);
  const deleteInfo = useSelector((state) => state.admins.idFromRow);
  const showDelete = useSelector((state) => state.admins.showDeleteMessage);
  const showFeedback = useSelector((state) => state.admins.showFeedbackMessage);
  const history = useHistory();

  const editData = (row) => {
    dispatch(getSelectedAdmin(row));
    history.push(`/admins/form/`);
  };

  const deleteHandler = () => {
    dispatch(deleteAdmin(deleteInfo));
  };

  useEffect(() => {
    dispatch(cleanSelectedAdmin());
  }, []);

  const adminData = admins.map((admin) => {
    return {
      ...admin,
      moreInfo: <Button label="..." disabled={true} theme="disabled" />,
      active: admin.active,
      isActive: admin.active ? 'Active' : 'Inactive'
    };
  });
  return (
    <section className={styles.container}>
      <Table
        data={adminData}
        headersName={['Name', 'Last Name', 'Phone', 'E-mail', 'Status', 'More information']}
        headers={['name', 'lastName', 'phone', 'email', 'isActive', 'moreInfo']}
        deleteAdmin={deleteHandler}
        editData={editData}
        setShowModal={(handler) => dispatch(showDeleteMessage(handler))}
        setidFromRow={(adminId) => dispatch(setidFromRow(adminId))}
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
          idFromRow={deleteInfo}
          deleteItem={deleteHandler}
          setShowModal={(handler) => dispatch(showDeleteMessage(handler))}
        />
      </Modal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default AdminsTable;
