import { useState, useEffect } from 'react';
import SharedForm from '../../Shared/Form';
import InputText from '../../Shared/Input/InputText';
import InputSelect from '../../Shared/Input/InputSelect';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Loader from '../../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { editProject, postProject } from '../../../redux/projects/thunks';
import { showFeedbackMessage } from '../../../redux/projects/actions';

const Form = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.projects.pending);
  const feedbackInfo = useSelector((state) => state.projects.infoForFeedback);
  const showFeedback = useSelector((state) => state.projects.showFeedbackMessage);
  const projectSelected = useSelector((state) => state.projects.projectSelected);
  const [employees, setEmployees] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  const [nameValue, setNameValue] = useState('');
  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const [startDateValue, setStartDateValue] = useState('');
  const onChangeStartDateInput = (event) => {
    setStartDateValue(event.target.value);
  };
  const [endDateValue, setEndDateValue] = useState('');
  const onChangeEndDateInput = (event) => {
    setEndDateValue(event.target.value);
  };
  const [descriptionValue, setDescriptionValue] = useState('');
  const onChangeDescriptionInput = (event) => {
    setDescriptionValue(event.target.value);
  };
  const [clientValue, setClientValue] = useState('');
  const onChangeClientInput = (event) => {
    setClientValue(event.target.value);
  };
  const [activeValue, setActiveValue] = useState('');
  const onChangeActiveInput = (event) => {
    setActiveValue(event.target.value);
  };
  const [membersValue, setMembersValue] = useState('');
  const onChangeMembersInput = (event) => {
    setMembersValue(event.target.value);
  };
  const [membersRoleValue, setMembersRoleValue] = useState('');
  const onChangeMembersRoleInput = (event) => {
    setMembersRoleValue(event.target.value);
  };

  const [membersRateValue, setMembersRateValue] = useState('');
  const onChangeMembersRateInput = (event) => {
    setMembersRateValue(event.target.value);
  };

  const title =
    projectSelected.length != 0 ? `Editing ${nameValue} projects's information.` : 'Add a Project';

  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (projectSelected.legth != 0) {
      setNameValue(projectSelected.name);
      setStartDateValue(projectSelected.startDate);
      setEndDateValue(projectSelected.endDate);
      setDescriptionValue(projectSelected.description);
      setClientValue(projectSelected.client);
      setMembersValue(projectSelected.members[0]?.name?._id || '');
      setActiveValue(projectSelected.active);
      setMembersRateValue(projectSelected.members[0]?.rate || '');
      setMembersRoleValue(projectSelected.members[0]?.role || '');
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: projectSelected.length != 0 ? 'PUT' : 'POST',
      url:
        projectSelected.length != 0 ? `${URL}/projects/${projectSelected._id}` : `${URL}/projects`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        startDate: startDateValue,
        endDate: endDateValue,
        description: descriptionValue,
        client: clientValue,
        members: [
          {
            name: membersValue,
            role: membersRoleValue,
            rate: membersRateValue
          }
        ],
        active: activeValue
      })
    };
    projectSelected.length != 0 ? dispatch(editProject(options)) : dispatch(postProject(options));
  };
  console.log('membersValue', membersValue);
  const arrayToMapEmployees = employees.map((employee) => {
    return { id: employee._id, optionContent: `${employee.firstName} ${employee.lastName}` };
  });

  return (
    <div className={styles.container}>
      {isPending && <Loader />}
      <h2>{title}</h2>
      <SharedForm onSubmit={onSubmit}>
        <InputText
          name="Name"
          type="text"
          label="Name"
          onChange={onChangeNameInput}
          placeholder="Write the project's name"
          value={nameValue}
          required
        />
        <InputText
          name="startDate"
          type="text"
          label="Start date"
          onChange={onChangeStartDateInput}
          placeholder="Write the start date"
          value={startDateValue}
          required
        />
        <InputText
          name="endDate"
          type="text"
          label="End date"
          onChange={onChangeEndDateInput}
          placeholder="Write the end date"
          value={endDateValue}
        />
        <InputText
          name="description"
          type="text"
          label="Description"
          onChange={onChangeDescriptionInput}
          placeholder="Write the description"
          value={descriptionValue}
          required
        />
        <InputText
          name="client"
          label="Client"
          type="text"
          onChange={onChangeClientInput}
          placeholder="Write the Client's name"
          value={clientValue}
          required
        />
        <InputSelect
          className={styles.select}
          arrayToMap={[
            { id: true, optionContent: 'True' },
            { id: false, optionContent: 'False' }
          ]}
          id="active"
          name="active"
          label="Active"
          value={activeValue}
          onChange={onChangeActiveInput}
        />
        <InputSelect
          className={styles.select}
          arrayToMap={arrayToMapEmployees}
          id="members"
          name="members"
          label="Members"
          value={membersValue}
          onChange={onChangeMembersInput}
        />
        <InputSelect
          className={styles.select}
          arrayToMap={[
            { id: 'TL', optionContent: 'TL' },
            { id: 'QA', optionContent: 'QA' },
            { id: 'DEV', optionContent: 'DEV' },
            { id: 'PM', optionContent: 'PM' }
          ]}
          id="role"
          name="role"
          label="Role"
          value={membersRoleValue}
          onChange={onChangeMembersRoleInput}
        />
        <InputText
          name="rate"
          type="text"
          label="Rate"
          onChange={onChangeMembersRateInput}
          placeholder="Write the rate"
          value={membersRateValue}
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
    </div>
  );
};

export default Form;
