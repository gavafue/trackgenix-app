import styles from 'Components/SuperAdmin/AdminsList/index.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { editAdminStatus, getAdmins } from 'redux/admins/thunks';
import Preloader from 'Components/Shared/Preloader';
import { showFeedbackMessage, setidFromRow, getSelectedAdmin } from 'redux/admins/actions';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import { useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import ChangeStatusMessage from 'Components/Shared/ChangeStatusMessage';
import Input from 'Components/Shared/Input/InputText';

const AdminsList = () => {
  const [showModal, setShowModal] = useState(false);
  const isPending = useSelector((state) => state.admins.isPending);
  const feedbackInfo = useSelector((state) => state.admins.infoForFeedback);
  const idFromRow = useSelector((state) => state.admins.idFromRow);
  const showFeedback = useSelector((state) => state.admins.showFeedbackMessage);
  const adminSelected = useSelector((state) => state.admins.adminSelected);
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const admins = useSelector((state) => state.admins.list);

  const adminsData = admins.map((admin) => {
    if (
      admins &&
      search != '' &&
      admin.lastName?.toLowerCase() &&
      admin.name?.toLowerCase().includes(search.toLowerCase())
    ) {
      return {
        ...admin,
        fullName: `${admin.name} ${admin.lastName}`,
        location: admin.city,
        isActive: admin.active ? 'Active' : 'Inactive'
      };
    } else if (
      admins &&
      !search != '' &&
      admin.lastName.toLowerCase() &&
      admin.name?.toLowerCase().includes(search.toLowerCase())
    ) {
      return {
        ...admin,
        fullName: `${admin.name} ${admin.lastName}`,
        location: admin.city,
        isActive: admin.active ? 'Active' : 'Inactive'
      };
    }
  });

  const changeStatus = adminSelected.active ? 'disable' : 'activate';
  const deleteHandler = () => {
    const options = {
      headers: { 'Content-type': 'application/json' },
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/admins/status/${idFromRow}`,
      body: JSON.stringify({
        name: adminSelected.name,
        lastName: adminSelected.lastName,
        email: adminSelected.email,
        gender: adminSelected.gender,
        phone: adminSelected.phone,
        dateBirth: adminSelected.dateBirth?.slice(0, 10),
        city: adminSelected.city,
        zip: adminSelected.zip,
        active: !adminSelected.active
      })
    };
    dispatch(editAdminStatus(options));
  };
  return (
    <section className={styles.container}>
      <div className={styles.button}>
        <Button label={'Add admin'} onClick={() => history.push(`/superadmin/addAdmin/`)} />
      </div>
      <div className={styles.searchBar}>
        <Input
          label="Search&nbsp;by&nbsp;Admin's&nbsp;name:"
          id="search"
          type="text"
          onChange={handleSearch}
        />
      </div>
      <Table
        data={adminsData}
        headers={['fullName', 'location', 'isActive']}
        headersName={['Name', 'Location', 'Status']}
        setShowModal={setShowModal}
        getSelected={(adminId) => dispatch(getSelectedAdmin(adminId))}
        setidFromRow={(adminId) => dispatch(setidFromRow(adminId))}
      />
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        {' '}
        <ChangeStatusMessage
          handleClose={() => {
            setShowModal(false);
          }}
          resourceName={'Admin'}
          operation={changeStatus}
          idFromRow={idFromRow}
          confirmChange={() => deleteHandler()}
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

export default AdminsList;
