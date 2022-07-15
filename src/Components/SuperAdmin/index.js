import styles from 'Components/SuperAdmin/index.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { editAdminStatus, getAdmins } from 'redux/admins/thunks';
import DeleteMessage from 'Components/Shared/DeleteMessage';
import Preloader from 'Components/Shared/Preloader';
import {
  showFeedbackMessage,
  setInfoForDelete,
  // showDeleteMessage,
  getSelectedAdmin
} from 'redux/admins/actions';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import { useHistory } from 'react-router-dom';

const SuperAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const isPending = useSelector((state) => state.admins.isPending);
  const feedbackInfo = useSelector((state) => state.admins.infoForFeedback);
  const deleteInfo = useSelector((state) => state.admins.infoForDelete);
  // const showDelete = useSelector((state) => state.admins.showDeleteMessage);
  const showFeedback = useSelector((state) => state.admins.showFeedbackMessage);
  const adminSelected = useSelector((state) => state.admins.adminSelected);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const editData = (row) => {
    dispatch(getSelectedAdmin(row));
    history.push(`/superadmin/form`);
  };

  const admins = useSelector((state) => state.admins.list).map((admin) => ({
    ...admin,
    name: `${admin.name} ${admin.lastName}`,
    location: admin.city,
    active: admin.active ? 'Active' : 'Inactive'
  }));
  console.log(admins);
  const deleteHandler = () => {
    console.log('adminselected', adminSelected);
    const options = {
      headers: { 'Content-type': 'application/json' },
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/admins/lowlogic/${deleteInfo}`,
      body: JSON.stringify({
        name: adminSelected.name,
        lastName: adminSelected.lastName,
        email: adminSelected.email,
        gender: adminSelected.gender,
        phone: adminSelected.phone,
        dateBirth: adminSelected.dateBirth?.slice(0, 10),
        city: adminSelected.city,
        zip: adminSelected.zip,
        active: false
      })
    };
    dispatch(editAdminStatus(options));
  };
  return (
    <section className={styles.container}>
      <Table
        data={admins}
        headers={['name', 'location', 'active']}
        headersName={['Name', 'Location', 'Status']}
        setShowModal={setShowModal}
        editData={editData}
        setInfoForDelete={(adminId) => dispatch(setInfoForDelete(adminId))}
      />
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        {' '}
        <DeleteMessage
          handleClose={() => {
            setShowModal(false);
          }}
          resourceName={'Admin'}
          infoForDelete={deleteInfo}
          deleteItem={() => deleteHandler()}
          setShowModal={setShowModal}
        />
      </Modal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(false));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default SuperAdmin;
