import styles from 'Components/SuperAdmin/index.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAdmins } from 'redux/admins/thunks';
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdmins());
  }, []);
  const [showModal, setShowModal] = useState(false);
  const isPending = useSelector((state) => state.admins.isPending);
  const feedbackInfo = useSelector((state) => state.admins.infoForFeedback);
  const deleteInfo = useSelector((state) => state.admins.infoForDelete);
  // const showDelete = useSelector((state) => state.admins.showDeleteMessage);
  const showFeedback = useSelector((state) => state.admins.showFeedbackMessage);
  const history = useHistory();
  const editData = (row) => {
    dispatch(getSelectedAdmin(row));
    history.push(`/superadmin/form`);
  };

  const deleteHandler = () => {
    console.log('holi');
  };
  const admins = useSelector((state) => state.admins.list)
    // .filter((admin) => admin.active === true)
    .map((admin) => ({
      name: `${admin.name} ${admin.lastName}`,
      location: admin.city,
      status: admin.active ? 'Active' : 'Inactive'
    }));
  console.log(admins);
  return (
    <section className={styles.container}>
      <Table
        data={admins}
        headers={['name', 'location', 'status']}
        headersName={['Name', 'Location', 'Status']}
        setShowModal={setShowModal}
        editData={editData}
        setInfoForDelete={() => {
          dispatch(setInfoForDelete());
        }}
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
          deleteItem={deleteHandler}
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
