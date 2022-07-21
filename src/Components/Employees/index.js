import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Button from 'Components/Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployee } from 'redux/employees/thunks';
import {
  showDeleteMessage,
  showFeedbackMessage,
  getSelectedEmployee,
  cleanSelectedEmployee
} from 'redux/employees/actions';

function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isPending = useSelector((state) => state.employees.isPending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const [isActive, setIsActive] = useState(true);
  const toggleIsActive = () => {
    setIsActive((current) => !current);
  };
  const history = useHistory();
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
    if (isActive && employee.active) return employee;
    if (!isActive && !employee.active) return employee;
  });

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Button label="Add new employee" onClick={createEmployee} />
      <Button
        label={`Show ${!isActive ? 'Active' : 'Inactive'}`}
        onClick={toggleIsActive}
        theme="secondary"
      />
      <Table
        data={employeesData}
        headersName={['Name', 'Last Name', 'Email', 'Phone']}
        headers={['firstName', 'lastName', 'email', 'phone']}
        setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        editData={editData}
      />
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
}

export default Employees;
