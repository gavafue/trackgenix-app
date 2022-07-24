import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Button from 'Components/Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import Input from 'Components/Shared/Input/InputText';
import ChangeStatusMessage from 'Components/Shared/ChangeStatusMessage';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployee, editEmployeeStatus } from 'redux/employees/thunks';
import {
  showFeedbackMessage,
  getSelectedEmployee,
  cleanSelectedEmployee,
  setidFromRow
} from 'redux/employees/actions';
function Employees() {
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector((state) => state.employees.list);
  const isPending = useSelector((state) => state.employees.isPending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const idFromRow = useSelector((state) => state.employees.idFromRow);
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const changeStatus = isActive ? 'disable this' : 'activate this';
  const toggleIsActive = () => {
    setIsActive((current) => !current);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const editData = (row) => {
    dispatch(getSelectedEmployee(row));
    history.push(`/employees/form/`);
  };
  const createEmployee = () => {
    history.push('/register/employee');
  };
  useEffect(() => {
    dispatch(cleanSelectedEmployee());
    dispatch(getEmployee());
  }, []);

  const employeesData = employees.map((employee) => {
    if (isActive && employee.active && employee.email?.toLowerCase().includes(search.toLowerCase()))
      return employee;
    if (
      !isActive &&
      !employee.active &&
      employee.email?.toLowerCase().includes(search.toLowerCase())
    )
      return employee;
  });
  const lowLogicHandler = () => {
    const options = {
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/employees/${idFromRow}`,
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        active: !isActive
      })
    };
    dispatch(editEmployeeStatus(options));
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        <Button label="Add new employee" onClick={createEmployee} />
        <Button
          label={`Show ${!isActive ? 'Active' : 'Inactive'}`}
          onClick={toggleIsActive}
          theme="secondary"
        />
        <Input label="Search by email:" id="search" type="text" onChange={handleSearch} />
      </div>
      <Table
        data={employeesData}
        headersName={['Name', 'Last Name', 'Email', 'Phone']}
        headers={['firstName', 'lastName', 'email', 'phone']}
        setShowModal={setShowModal}
        editData={editData}
        setidFromRow={(employeeId) => dispatch(setidFromRow(employeeId))}
      />
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        <ChangeStatusMessage
          handleClose={() => {
            setShowModal(false);
          }}
          resourceName={'Employee'}
          operation={changeStatus}
          idFromRow={idFromRow}
          confirmChange={() => lowLogicHandler()}
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
}

export default Employees;
